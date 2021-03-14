import { userHelper } from "../helper/userHelper";
import * as React from "react";
import { useHistory } from "react-router";
import Form from "../../components/Form/Form";

import useUserActions from "users/hooks/useUserActions";
interface IUsersCreateProps {}

const UsersCreate: React.FunctionComponent<IUsersCreateProps> = (props) => {
  let history = useHistory();
  const { createUser } = useUserActions();

  const [error, setError] = React.useState<null | string>(null);

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      <Form
        formFields={userHelper.getFormFields()}
        submitLabel="Create User"
        onSubmit={(res) => {
          createUser({
            email: res.email,
            name: res.name,
            isAdmin: res.isAdmin,
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
    </>
  );
};

export default UsersCreate;
