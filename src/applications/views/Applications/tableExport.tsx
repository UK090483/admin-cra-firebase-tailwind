import * as React from "react";
import * as ExcelJS from "exceljs";
import { ApplicationHelper } from "applications/helper/ApplicationHelper";
import { AssessmentHelper } from "../../../assessments/helper/AssessmentHelper";
import useJudges from "judges/hooks/useJudges";

interface ITableExportProps {
  data: any;
}

const TableExport: React.FunctionComponent<ITableExportProps> = ({ data }) => {
  const [url, setUrl] = React.useState("");

  const { judges } = useJudges();
  const cleanData = AssessmentHelper.evaluateTableData(data, judges);

  React.useEffect(() => {
    const workbook = new ExcelJS.Workbook();
    const worksheetApplications = workbook.addWorksheet("Applications");
    const worksheetAssessments = workbook.addWorksheet("Assessments");

    worksheetApplications.columns = buildColumns("applications");
    worksheetAssessments.columns = buildColumns("assessments");

    if (cleanData) {
      cleanData.forEach((element: any) => {
        worksheetApplications.addRow(element);

        if (element.assessments) {
          Object.values(element.assessments).forEach((e: any) => {
            worksheetAssessments.addRow({ application: element.id, ...e });
          });
        }
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
  }, [data]);

  return (
    <a href={url} download>
      Export
    </a>
  );
};

export default TableExport;

const buildColumns = (type: "applications" | "assessments") => {
  const fields = ApplicationHelper.getAllFields();
  const assessmentFields = AssessmentHelper.getQuestions();
  const res: any[] = [];
  if (type === "applications") {
    res.push({
      header: "Sum",
      key: "sum",
      width: 20,
    });
    Object.entries(fields).forEach(([key, value]) => {
      res.push({
        header: value.label,
        key,
        width: value.label.length + 5,
      });
    });
  }
  if (type === "assessments") {
    res.push({
      header: "Application",
      key: "application",
      width: 20,
    });

    Object.entries(assessmentFields).forEach(([key, value]) => {
      res.push({
        header: value.label,
        key: value.source,
        width: value.label.length,
      });
    });
  }
  return res;
};
