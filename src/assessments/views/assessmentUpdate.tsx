import { useActions } from "hooks/useActions";
import * as React from "react";
import { useParams } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import Form, { FormField } from "../../components/Form/Form";
import { AssessmentHelper } from "../helper/AssessmentHelper";
import useAssessments from "../hooks/useAssessments";

interface IAssessmentUpdateProps extends RouteComponentProps {}

interface ParamTypes {
  judge_id: string;
  application_id: string;
}

const AssessmentUpdate: React.FunctionComponent<IAssessmentUpdateProps> = (
  props
) => {
  const { updateAssessment } = useActions();

  const { goBack } = props.history;

  let { judge_id, application_id } = useParams<ParamTypes>();
  const { AssessmentsByApplicationId } = useAssessments();

  const assessment =
    AssessmentsByApplicationId &&
    AssessmentsByApplicationId[application_id] &&
    AssessmentsByApplicationId[application_id][judge_id];

  const fields: FormField[] = AssessmentHelper.getQuestions().map((field) => ({
    type: "points",
    label: field.label,
    name: field.source,
  }));

  if (!assessment) return <div></div>;

  const updateAbles = AssessmentHelper.getQuestions().reduce(
    (acc, q) => ({
      ...acc, // @ts-ignore
      ...(assessment[q.source] && { [q.source]: assessment[q.source] }),
    }),
    {}
  );

  return (
    <div>
      <div>AssessmentUpdate</div>
      <Form
        formFields={fields}
        submitLabel="Update"
        initialValues={updateAbles}
        onSubmit={(v, helpers) => {
          updateAssessment({ application_id, judge_id, data: v }).then(() => {
            goBack();
          });
          helpers.resetForm({ values: v });
        }}
      ></Form>
    </div>
  );
};

export default AssessmentUpdate;
