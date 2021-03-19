import React from "react";

import Table from "components/Table/Table";
import { AssessmentHelper } from "assessments/helper/AssessmentHelper";
import useJudges from "judges/hooks/useJudges";
import { IColumn } from "components/Table/types";

import { IAssessmentRecord } from "assessments/types";
import { IApplicationRecord } from "applications/ApplicationTypes";
import ManageAssessmentStatus from "assessments/views/ManageAssessmentStatus";
import useAssessments from "assessments/hooks/useAssessments";
import { useParams } from "react-router-dom";
import { RoutingParam } from "types";

interface IApplicationSingleTableProps {}

const ApplicationSingleTable: React.FC<IApplicationSingleTableProps> = () => {
  let { id } = useParams<RoutingParam>();
  const { AssessmentsByApplicationId } = useAssessments();
  const { judges } = useJudges();
  const assessments =
    AssessmentsByApplicationId && AssessmentsByApplicationId[id]
      ? Object.values(AssessmentsByApplicationId[id])
      : [];

  if (!judges) return <div>Loading</div>;

  const pointFields = AssessmentHelper.getTableFields().map((question) => ({
    field: question.source,
    use: question.shortLabel,
    width: "w-14",
  }));
  const columns: IColumn[] = [
    {
      field: "judge_id",
      use: "Name",

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
      <Table
        rowStyle={(row) => {
          return row.status === "hidden" ? "bg-red-400" : "";
        }}
        columns={columns}
        rows={assessments.map((a) => ({ ...a, id: a.judge_id }))}
      ></Table>
    </>
  );
};

export default ApplicationSingleTable;
