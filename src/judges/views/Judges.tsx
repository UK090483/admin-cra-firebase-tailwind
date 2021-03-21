import ActionButton from "components/Buttons/ActionButton";
import PageLoading from "components/Spinner/PageLoading";
import Table from "components/Table/Table";
import { IRow } from "components/Table/types";
import useJudges from "judges/hooks/useJudges";
import { useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { RootState } from "redux/Reducers/RootReducer";
import NoDataPanel from "../../components/NoDataPanel";
import ManageJudgeStatus from "./ManageJudgeStatus";

function Judges() {
  const { judgesOrdered } = useJudges();

  useFirebaseConnect([{ path: "presence" }]);

  const presence = useSelector(
    (state: RootState) => state.fb.data.presence || {}
  );

  const judgesWithPresence =
    judgesOrdered &&
    judgesOrdered.map((judge) => ({
      ...judge,
      online: presence[judge.id],
    }));

  let history = useHistory();

  if (!judgesWithPresence) {
    return <NoDataPanel text={"No Judges yet"} createPath="/judges/create" />;
  }

  return (
    <>
      <ActionButton path="/judges/create" type="create" />

      <Table
        rowStyle={(row) => {
          return row.online && "bg-green-300";
        }}
        onRowClick={(data) => {
          history.push(`/judges/${data.id}`);
        }}
        columns={columns}
        rows={judgesWithPresence}
      />
    </>
  );
}

export default Judges;

const columns = [
  {
    field: "name",
    use: "Name",
    use_in_search: true,
    render: (row: IRow) => (
      <div
        className={`${row.color}  p-2 pl-4 rounded-full text-white font-extrabold max-w-xs `}
      >
        {row.name}
      </div>
    ),
    width: "w-1/3",
  },
  {
    field: "email",
    use: "Email",
    use_in_search: true,
  },
  {
    field: "judgeType",
    use: "Type",
    use_in_search: true,
  },
  {
    field: "active",
    use: "Active",
    use_in_search: true,
    render: (row: IRow) => <div>{row.active ? "ja" : "nein"}</div>,
  },
  {
    field: "state",
    use: "Done",
    render: (row: IRow) => (
      <div onClick={(e) => e.stopPropagation()}>
        <ManageJudgeStatus status={row.state} judge_id={row.id} />
      </div>
    ),
    width: "w-14",
  },
];
