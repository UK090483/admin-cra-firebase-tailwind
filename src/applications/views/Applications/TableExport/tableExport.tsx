import useApplications from "applications/hooks/useApplications";
import { AssessmentHelper } from "assessments/helper/AssessmentHelper";
import useAssessments from "assessments/hooks/useAssessments";

import { getCssfromColorClass } from "helper/getColorFromclass";
import useJudges from "judges/hooks/useJudges";
import * as React from "react";
import { JudgeData } from "redux/Reducers/RootReducer";
import { round } from "../../../../helper/round";
import { Spinner } from "../../../../components/Spinner/Spinner";
import { IJudgeRecord } from "../../../../judges/JudgeTypes";

interface ITableExportProps {}

const TableExport: React.FunctionComponent<ITableExportProps> = () => {
  const [url, setUrl] = React.useState("");
  const [building, setBuilding] = React.useState(false);

  const { judges } = useJudges();
  const { AssessmentsByApplicationId } = useAssessments();

  const { ordered: applications } = useApplications();
  const { sumByApplicationId } = useAssessments();

  const createTable = async () => {
    if (!judges) return;
    setBuilding(true);

    const sortedJudges = Object.values({ ...judges }).sort((a, b) => {
      return a.judgeType === b.judgeType ? 0 : a.judgeType === "main" ? -1 : 1;
    }) as IJudgeRecord[];

    const ExcelJS = await import("exceljs");
    const workbook = new ExcelJS.Workbook();
    const worksheetApplications = workbook.addWorksheet("Applications");

    worksheetApplications.columns = buildColumns(sortedJudges);

    if (applications) {
      Object.values(applications).forEach((application) => {
        const { id } = application;

        if (application.stateTree !== "accepted") return;

        worksheetApplications.addRow({
          ...application,
          id,
          ...judgeToTableData(judges, id, AssessmentsByApplicationId),
          sum: sumByApplicationId[id]
            ? round(sumByApplicationId[id].main)
            : "---",
        });
      });

      worksheetApplications.eachRow((row) => {
        row.border = { bottom: { style: "thin" }, left: { style: "thin" } };
        row.height = 30;
        row.alignment = { vertical: "middle" };
      });

      getJudgeNames(sortedJudges, worksheetApplications);
      workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);

        setUrl(url);
        setBuilding(false);
      });
    }
  };

  if (building) {
    return (
      <div className="w-20">
        <Spinner size="2/3" />
      </div>
    );
  }

  if (url) {
    return (
      <a
        href={url}
        download
        onClick={() => {
          setTimeout(() => setUrl(""), 20);
        }}
      >
        Download
      </a>
    );
  }

  return <a onClick={createTable}>Export</a>;
};

const getJudgeNames = (judges: IJudgeRecord[], ws: any) => {
  ws.insertRow(0, {});

  Object.values(judges)
    // .filter((judge) => judge.judgeType === "main")
    .forEach((judge, index) => {
      ws.getCell(1, 6 + index * 12).value = judge.name + " " + judge.judgeType;
      ws.getCell(1, 6 + index * 12).alignment = {
        vertical: "middle",
        horizontal: "left",
      };
    });
};

const judgeToTableData = (
  judges: JudgeData,
  applicationId: string,
  AssessmentsByApplicationId: any
) => {
  const assessmentFields = AssessmentHelper.getQuestions();
  return Object.entries(judges).reduce((acc, [judgeId, value]) => {
    if (!(value.assessments && value.assessments[applicationId]))
      return { ...acc };
    const res = assessmentFields.reduce((acc2, field) => {
      // @ts-ignore
      if (!value.assessments[applicationId][field.source]) return { ...acc2 };

      const sum =
        AssessmentsByApplicationId &&
        AssessmentsByApplicationId[applicationId] &&
        AssessmentsByApplicationId[applicationId][judgeId] &&
        AssessmentsByApplicationId[applicationId][judgeId].sum;
      return {
        ...acc2, // @ts-ignore
        [field.source + judgeId]: value.assessments[applicationId][
          field.source
        ],

        ["sum" + judgeId]: sum,
      };
    }, {});

    return { ...acc, ...res };
  }, {});
};

const buildColumns = (judges: IJudgeRecord[]) => {
  const assessmentFields = AssessmentHelper.getQuestions();
  const res: any[] = [];

  res.push({
    header: "ID",
    key: "id",
    width: 20,
  });
  res.push({
    header: "Name",
    key: "startupName",
    width: 20,
  });
  res.push({
    header: "Industry",
    key: "industry",
    width: 20,
  });
  res.push({
    header: "Headquarters",
    key: "headquarters",
    width: 20,
  });
  res.push({
    header: "Sum",
    key: "sum",
    width: 4,
    style: {
      alignment: { vertical: "middle", horizontal: "center" },
    },
  });

  Object.values(judges).forEach((judge) => {
    // if (judge.judgeType === "pre") return;

    Object.entries(assessmentFields).forEach(([key, value]) => {
      res.push({
        header: value.shortLabel,
        key: value.source + judge.id,
        width: 4,
        style: {
          alignment: { vertical: "middle", horizontal: "center" },
          fill: {
            type: "pattern",
            pattern: "darkVertical",

            fgColor: {
              argb: getCssfromColorClass(judge.color).replace("#", ""),
            },
          },
        },
      });
    });
    res.push({
      header: "SUM",
      key: "sum" + judge.id,
      width: 4,
      style: {
        alignment: { vertical: "middle", horizontal: "center" },
      },
    });
  });

  return res;
};

export default TableExport;
