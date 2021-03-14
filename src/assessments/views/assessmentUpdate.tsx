import useJudges from "judges/hooks/useJudges";
import { update } from "lodash";
import * as React from "react";
import { useHistory, useParams } from "react-router";
import Form from "../../components/Form/Form";

import useApplications from "applications/hooks/useApplications";

interface IAssessmentUpdateProps {}

interface ParamTypes {
  id: string;
}

const AssessmentUpdate: React.FunctionComponent<IAssessmentUpdateProps> = () => {
  let { id } = useParams<ParamTypes>();
  const { judges } = useJudges();

  const { assessmentsByJudgeId } = useApplications();

  return (
    <div>AssessmentUpdate</div>
    // <Form
    //   formFields={}
    //   submitLabel="Update"
    //   onSubmit={(res) => {

    //     history.push("/judges");
    //   }}
    // ></Form>
  );
};

export default AssessmentUpdate;
