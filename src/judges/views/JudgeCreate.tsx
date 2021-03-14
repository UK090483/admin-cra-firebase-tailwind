import { JudgeHelper } from "judges/helper/JudgeHelper";
import * as React from "react";
import { useHistory } from "react-router";
import Form from "../../components/Form/Form";
import useJudgeActions from "../hooks/useJudgeActions";
import { Field } from "formik";
import LoadingSection from "components/Spinner/LoadingSection";
import FormBuilder from "../../components/Form/FormBuilder";

interface IJudgeCreateProps {}

const JudgeCreate: React.FunctionComponent<IJudgeCreateProps> = (props) => {
  let history = useHistory();
  const { addJudge } = useJudgeActions();
  const [error, setError] = React.useState<null | string>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      <LoadingSection loading={loading}>
        <Form
          formFields={JudgeHelper.getFormFields()}
          submitLabel="Add Judge"
          initialValues={{ judgeType: "pre" }}
          onSubmit={(res) => {
            setLoading(true);
            addJudge({
              email: res.email,
              name: res.name,
              color: res.color,
              judgeType: res.type,
              active: res.active,
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
      </LoadingSection>
    </>
  );
};

export default JudgeCreate;
