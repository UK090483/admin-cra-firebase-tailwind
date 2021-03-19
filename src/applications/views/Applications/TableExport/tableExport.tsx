import * as React from "react";
import * as ExcelJS from "exceljs";
import { ApplicationHelper } from "applications/helper/ApplicationHelper";
import { AssessmentHelper } from "assessments/helper/AssessmentHelper";
import useJudges from "judges/hooks/useJudges";
import { getCssfromColorClass } from "helper/getColorFromclass";
import useAssessments from "../../../../assessments/hooks/useAssessments";
import { JudgeData, RootState } from "../../../../redux/Reducers/RootReducer";
import { useSelector } from "react-redux";
import { Key } from "heroicons-react";

interface ITableExportProps {}

const TableExport: React.FunctionComponent<ITableExportProps> = () => {
  const [url, setUrl] = React.useState("");

  const { judges } = useJudges();
  const { AssessmentsByApplicationId } = useAssessments();

  const applications = useSelector(
    (state: RootState) => state.firestore.data.tableDoc?.first
  );

  React.useEffect(() => {
    if (!judges) return;
    const workbook = new ExcelJS.Workbook();
    const worksheetApplications = workbook.addWorksheet("Applications");

    worksheetApplications.columns = buildColumns(judges);

    if (applications) {
      Object.entries(applications).forEach((element: any) => {
        const [id, application] = element;
        if (application.stateTree !== "accepted") return;

        worksheetApplications.addRow({
          ...application,
          id,
          ...judgeToTableData(judges, id),
        });
      });
      getJudgeNames(judges, worksheetApplications);
      workbook.xlsx.writeBuffer().then((data) => {
        console.log("doc ready");
        const blob = new Blob([data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        setUrl(url);
      });
    }
  }, [AssessmentsByApplicationId, judges]);

  return (
    <a href={url} download>
      Export
    </a>
  );
};

const getJudgeNames = (judges: JudgeData, ws: ExcelJS.Worksheet) => {
  ws.insertRow(0, {});
  Object.values(judges).forEach((judge, index) => {
    ws.getCell(1, 6 + index * 11).value = judge.name;
  });
};

const judgeToTableData = (judges: JudgeData, applicationId: string) => {
  const assessmentFields = AssessmentHelper.getQuestions();
  return Object.entries(judges).reduce((acc, [judgeId, value]) => {
    if (!(value.assessments && value.assessments[applicationId]))
      return { ...acc };
    const res = assessmentFields.reduce((acc2, field) => {
      // @ts-ignore
      if (!value.assessments[applicationId][field.source]) return { ...acc2 };

      return {
        ...acc2, // @ts-ignore
        [field.source + judgeId]: value.assessments[applicationId][
          field.source
        ],
      };
    }, {});

    return { ...acc, ...res };
  }, {});
};

const buildColumns = (judges: JudgeData) => {
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
    width: 20,
  });

  Object.values(judges).forEach((judge) => {
    Object.entries(assessmentFields).forEach(([key, value]) => {
      res.push({
        header: value.shortLabel,
        key: value.source + judge.id,
        width: 4,
        style: {
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
  });

  return res;
};

export default TableExport;
