import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/Reducers/RootReducer";
// import { selectJudgeById } from "judges/state/judgesSelectors";
import useApplications from "applications/hooks/useApplications";
import Table from "components/Table/Table";
import ActionButton from "components/Buttons/ActionButton";
import { AssessmentHelper } from "../../assessments/helper/AssessmentHelper";
import ManageAssessmentStatus from "assessments/views/ManageAssessmentStatus";
import { useFirestoreConnect } from "react-redux-firebase";

interface ParamTypes {
  id: string;
}
export default function Application() {
  let { id } = useParams<ParamTypes>();

  const history = useHistory();
  const { assessmentsByJudgeId } = useApplications();

  const assessments = assessmentsByJudgeId[id]
    ? Object.values(assessmentsByJudgeId[id])
    : [];

  const judge = useSelector((state: RootState) =>
    state.fb.data.judges ? state.fb.data.judges[id] || {} : {}
  );

  useFirestoreConnect([{ collection: "judges", doc: id }]);

  const columns = [
    {
      field: "application_name",
      use: "Name",
      use_in_search: true,
    },

    ...AssessmentHelper.getQuestions().map((field) => ({
      field: field.source,
      use: field.shortLabel,
      width: "w-20",
    })),

    {
      field: "---",
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
  ];

  return (
    <>
      <ActionButton path={`/judges/${id}/update`} type="update" />

      {judge && (
        <h5
          className={`flex justify-center items-center text-xl w-44 rounded-full p-3 mb-5 ${judge.color} `}
        >
          {judge.name}
        </h5>
      )}
      {assessments && (
        <Table
          rowStyle={(row) => {
            return row.status === "hidden" ? "bg-red-400" : "";
          }}
          onRowClick={(row) =>
            history.push(`/applications/${row.application_id}`)
          }
          columns={columns}
          rows={assessments}
        ></Table>
      )}
    </>
  );
}
