import React from "react";
import Table from "components/Table/Table";
import ActionButton from "components/Buttons/ActionButton";
import BooleanTableField from "components/Table/fields/booleanTableField";
import { IRow } from "components/Table/types";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { RootState } from "../../redux/Reducers/RootReducer";

const Users: React.FC = () => {
  useFirestoreConnect([{ collection: "users" }]);
  const users = useSelector(
    (state: RootState) => state.firestore.ordered.users
  );

  if (!users) {
    return <div>loading</div>;
  }

  return (
    <>
      <ActionButton path="users/create" type="create" />
      <Table
        rows={users}
        columns={[
          {
            field: "name",
            use: "Name",
            use_in_search: true,
          },
          {
            field: "email",
            use: "Email",
            use_in_search: true,
          },
          {
            field: "admin",
            use: "Admin",
            render: (row: IRow) => (
              <BooleanTableField row={row} field="admin" />
            ),
          },
          {
            field: "action",
            use: "",
            width: "w-6",
            render: (row: IRow) => (
              <ActionButton
                type="update"
                path={`users/${row.id}/update`}
                size="s"
              />
            ),
          },
        ]}
      />
    </>
  );
};

export default Users;
