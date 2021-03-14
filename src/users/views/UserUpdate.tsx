import { userHelper } from "../helper/userHelper";
import * as React from "react";

import Form from "../../components/Form/Form";
import { useHistory, useParams } from "react-router";

import useUserActions from "users/hooks/useUserActions";
import { RoutingParam } from "types";
import useUsers from "users/hooks/useUsers";
import EraseButton from "components/Buttons/EraseButton";
interface IUserUpdateProps {}

const UserUpdate: React.FunctionComponent<IUserUpdateProps> = (props) => {
  let { id } = useParams<RoutingParam>();
  const [error, setError] = React.useState<null | string>(null);

  const { users } = useUsers();

  const user = users ? users[id] : null;

  let history = useHistory();
  const { updateUser } = useUserActions();

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      <EraseButton onClick={() => {}} />
      {user && (
        <Form
          formFields={userHelper.getFormFields(user)}
          submitLabel="Add"
          onSubmit={(res) => {
            updateUser({
              email: res.email,
              name: res.name,
              admin: res.admin,
              active: res.active,
              write: res.write,
              uid: id,
            })
              .then((res) => {
                if (res.error) {
                  setError("There is an error:  " + res.error.message);
                } else {
                  history.push("/users");
                }
              })
              .catch((err) => {
                setError("There is an error");
              });
          }}
        />
      )}
    </>
  );
};

export default UserUpdate;
