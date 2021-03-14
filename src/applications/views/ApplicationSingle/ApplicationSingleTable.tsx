import React from "react";

import Table from "components/Table/Table";
import { AssessmentHelper } from "assessments/helper/AssessmentHelper";
import useJudges from "judges/hooks/useJudges";
import { IColumn } from "components/Table/types";

import { IAssessmentRecord } from "assessments/types";
import { IApplicationRecord } from "applications/ApplicationTypes";
import ManageAssessmentStatus from "assessments/views/ManageAssessmentStatus";

interface IApplicationSingleTableProps {
  application: IApplicationRecord;
}

const ApplicationSingleTable: React.FC<IApplicationSingleTableProps> = ({
  application,
}) => {
  const { judges } = useJudges();
  const assessments: IAssessmentRecord[] = application?.assessments
    ? Object.entries(application.assessments).map((item) => ({
        ...item[1],
        id: item[0],
      }))
    : [];

  const pointFields = AssessmentHelper.getTableFields().map((question) => ({
    field: question.source,
    use: question.shortLabel,
    width: "w-14",
  }));
  const columns: IColumn[] = [
    {
      field: "judge_id",
      use: "Name",
      use_in_search: true,

      render: (row) => (
        <div
          className={`${
            judges[row.judge_id].color
          } p-2 pl-4 rounded-full  font-extrabold max-w-xs ${
            judges[row.judge_id].judgeType === "main"
              ? "text-red-600"
              : "text-white"
          } `}
        >
          {judges[row.judge_id].name}
        </div>
      ),
    },

    ...pointFields,

    {
      field: "---",
      use: "Status",
      render: (row) => {
        return (
          <ManageAssessmentStatus
            active={row.status !== "hidden"}
            application_id={row.application_id}
            judge_id={row.judge_id}
          />
        );
      },
      width: "w-14",
    },
  ];
  return (
    <>
      {
        <Table
          rowStyle={(row) => {
            return row.status === "hidden" ? "bg-red-400" : "";
          }}
          columns={columns}
          rows={assessments}
        ></Table>
      }
    </>
  );
};

export default ApplicationSingleTable;
