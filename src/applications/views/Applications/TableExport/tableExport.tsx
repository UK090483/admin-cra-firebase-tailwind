import * as React from "react";
import * as ExcelJS from "exceljs";
import { ApplicationHelper } from "applications/helper/ApplicationHelper";
import { AssessmentHelper } from "assessments/helper/AssessmentHelper";
import useJudges from "judges/hooks/useJudges";
import { getCssfromColorClass } from "helper/getColorFromclass";

interface ITableExportProps {
  data: any;
}

const TableExport: React.FunctionComponent<ITableExportProps> = ({ data }) => {
  const [url, setUrl] = React.useState("");

  const { judges } = useJudges();
  const cleanData = AssessmentHelper.evaluateTableData(data, judges);

  React.useEffect(() => {
    if (!judges) return;

    const workbook = new ExcelJS.Workbook();
    const worksheetApplications = workbook.addWorksheet("Applications");

    worksheetApplications.columns = buildColumns(judges);

    if (cleanData) {
      cleanData.forEach((element: any) => {
        worksheetApplications.addRow(element);

        // if (element.assessments) {
        //   Object.values(element.assessments).forEach((e: any) => {
        //     worksheetAssessments.addRow({ application: element.id, ...e });
        //   });
        // }
      });
    }

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      setUrl(url);
    });
  }, [data, judges]);

  return (
    <a href={url} download>
      Export
    </a>
  );
};

export default TableExport;

const buildColumns = (judges: any) => {
  const fields = ApplicationHelper.getAllFields();
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
    // @ts-ignore
    const color = getCssfromColorClass(judge.color).replace("#", "");

    Object.entries(assessmentFields).forEach(([key, value]) => {
      res.push({
        header: value.shortLabel,
        key: value.source,
        width: 4,
        style: {
          fill: {
            type: "pattern",
            pattern: "darkVertical",
            // @ts-ignore
            fgColor: {
              argb: color,
            },
          },
        },
      });
    });
  });

  return res;
};
