import Table from "components/Table/Table";
import { useHistory } from "react-router-dom";
import useJudges from "judges/hooks/useJudges";
import { IRow } from "components/Table/types";
import ActionButton from "components/Buttons/ActionButton";
import { useFirebaseConnect } from "react-redux-firebase";
import { RootState } from "redux/Reducers/RootReducer";
import { useSelector } from "react-redux";

function Judges() {
  const { judgesOrdered } = useJudges();

  useFirebaseConnect([{ path: "presence" }]);

  const presence = useSelector(
    (state: RootState) => state.fb.data.presence || {}
  );

  const judgesWithPresence = judgesOrdered.map((judge) => ({
    ...judge,
    online: presence[judge.id],
  }));

  let history = useHistory();

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
  ];

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
