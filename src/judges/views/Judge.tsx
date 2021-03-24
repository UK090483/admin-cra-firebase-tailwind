import useApplications from "applications/hooks/useApplications";
import ManageAssessmentStatus from "assessments/views/ManageAssessmentStatus";
import ActionButton from "components/Buttons/ActionButton";
import PageLoading from "components/Spinner/PageLoading";
import Table from "components/Table/Table";
import { IRow } from "components/Table/types";
import { useFirestoreConnect } from "react-redux-firebase";
import { Link, useHistory, useParams } from "react-router-dom";
import { AssessmentHelper } from "../../assessments/helper/AssessmentHelper";
import useAssessments from "../../assessments/hooks/useAssessments";
import { IAssessmentRecord } from "../../assessments/types";
import useJudges from "../hooks/useJudges";
import { Pencil } from "heroicons-react";
import PasswordReset from "./passwordReset";

interface ParamTypes {
  id: string;
}
export default function Application() {
  let { id } = useParams<ParamTypes>();

  const history = useHistory();

  useFirestoreConnect([{ collection: "judges", doc: id }]);

  const { judges } = useJudges();
  const { data } = useApplications();
  const { judgeAverages } = useAssessments();

  const judge = judges && judges[id];

  const assessments =
    judge && judge.assessments
      ? (Object.values(judge.assessments) as IAssessmentRecord[])
      : [];

  const columns = [
    {
      field: "application_name",
      use: "Name",
      use_in_search: true,
      render: (row: IRow) => (
        <div>
          {data &&
            data[row.application_id] &&
            data[row.application_id].startupName}
        </div>
      ),
    },

    ...AssessmentHelper.getQuestions().map((field) => ({
      field: field.source,
      use: field.shortLabel,
      width: "w-20",
    })),

    {
      field: "id",
      use: "Status",
      render: (row: any) => {
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <ManageAssessmentStatus
              active={row.status !== "hidden"}
              application_id={row.application_id}
              judge_id={row.judge_id}
            />
          </div>
        );
      },
      width: "w-14",
    },

    {
      field: "judge_id",
      use: "",
      render: (row: any) => {
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <Link to={`/assessment/${row.id}/${row.judge_id}/update`}>
              <Pencil className="text-actionColor-300 hover:text-actionColor-700" />
            </Link>
          </div>
        );
      },
      width: "w-14",
    },
  ];

  if (!judge && !assessments) {
    return <PageLoading />;
  }

  return (
    <>
      <ActionButton path={`/judges/${id}/update`} type="update" />

      {judge && (
        <div className="flex">
          <h5
            className={`flex justify-center items-center text-xl w-44 rounded-full p-3 mb-5 ${judge.color} `}
          >
            {judge.name}
          </h5>
          {judgeAverages[id] && (
            <h5
              className={`flex justify-center items-center text-xl w-20 rounded-full p-3 mb-5 ml-4 ${judge.color} `}
            >
              {judgeAverages[id]}
            </h5>
          )}
        </div>
      )}

      <Table
        rowStyle={(row) => {
          return row.status === "hidden" ? "bg-red-400" : "";
        }}
        onRowClick={(row) =>
          history.push(`/applications/${row.application_id}`)
        }
        columns={columns}
        rows={assessments.map((item) => ({
          ...item,
          id: item.application_id,
        }))}
      ></Table>
    </>
  );
}
