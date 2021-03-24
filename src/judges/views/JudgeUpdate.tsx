import useJudges from "judges/hooks/useJudges";
import * as React from "react";
import { useHistory, useParams } from "react-router";
import Form from "../../components/Form/Form";
import { JudgeHelper } from "../helper/JudgeHelper";
import useJudgeActions from "../hooks/useJudgeActions";
import PasswordReset from "./passwordReset";

interface IJudgeUpdateProps {}

interface ParamTypes {
  id: string;
}

const JudgeUpdate: React.FunctionComponent<IJudgeUpdateProps> = () => {
  let { id } = useParams<ParamTypes>();
  const { judges } = useJudges();
  const [error, setError] = React.useState<null | string>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const judge = judges && judges[id];
  let history = useHistory();
  const { updateJudge } = useJudgeActions();

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}

      {judge && (
        <>
          <PasswordReset email={judge.email} />
          <Form
            formFields={JudgeHelper.getFormFields(judge)}
            submitLabel="Update"
            onSubmit={(res) => {
              setLoading(true);
              updateJudge({
                email: res.email,
                name: res.name,
                color: res.color,
                judgeType: res.judgeType,
                active: res.active,
                id,
              })
                .then((res) => {
                  setLoading(false);
                  if (res.error) {
                    setError("There is an error:  " + res.error.message);
                  } else {
                    history.push("/judges");
                  }
                })
                .catch((err) => {
                  setError("There is an error");
                });
            }}
          ></Form>
        </>
      )}
    </>
  );
};

export default JudgeUpdate;
