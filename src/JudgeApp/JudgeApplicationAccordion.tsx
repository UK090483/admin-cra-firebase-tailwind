import React from "react";
import { IApplicationRecord } from "applications/ApplicationTypes";
import { ApplicationHelper } from "applications/helper/ApplicationHelper";
import Accordion from "components/Accordion/Accordion";
import TextField from "components/Fields/TextField";
import Form, { FormValues } from "components/Form/Form";
import { AssessmentHelper } from "../assessments/helper/AssessmentHelper";
import { IAssessmentRecord } from "../assessments/types";
import { Field, FormikProps } from "formik";
import PointsField from "./PointsField";
import { getAssessmentStateColor } from "./helper/getAssessmentStateColor";
import { CheckCircle, Pencil, Check } from "heroicons-react";
import { debounce } from "./helper/debounce";
import ListField from "components/Fields/ListField";
import MediaArrayField from "components/Fields/MediaArrayField";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

interface IApplicationAccordion {
  application: IApplicationRecord;
}

const ApplicationAccordion: React.FC<IApplicationAccordion> = (props) => {
  const { application } = props;
  const firestore = useFirestore();

  const { judge_id, assessment } = useSelector((state: RootState) => ({
    judge_id: state.fb.auth.uid,
    assessment:
      state.fb.profile.assessments &&
      state.fb.profile.assessments[application.id]
        ? state.fb.profile.assessments[application.id]
        : {},
  }));

  let state = null;

  const assessmentDetails = AssessmentHelper.getQuestionsDetails();

  if (assessment) {
    state = AssessmentHelper.getAssessmentState(assessment);
  }

  return (
    <Form
      onSubmit={(res) => {
        firestore
          .update(
            { collection: "judges", doc: judge_id },
            {
              ...Object.entries(res).reduce(
                (acc, [key, value]) => ({
                  ...acc,
                  [`assessments.${application.id}.${key}`]: value,
                }),
                {}
              ),
              [`assessments.${application.id}.judge_id`]: judge_id,
              [`assessments.${application.id}.application_id`]: application.id,
            }
          )
          .then(() => {});
      }}
      formFields={[]}
      initialValues={assessment}
      submitButton={(props) => <SubmitButton {...props} />}
    >
      <div className="shadow-2xl">
        {ApplicationHelper.getTopics().map((topic, index) => {
          const topicAssessments = ApplicationHelper.getAssessments(topic);

          const topicState = topicAssessments
            ? topicAssessments.reduce((acc, item) => {
                return assessment ? !!assessment[item] : false;
              }, false)
            : false;

          return (
            <Accordion
              key={index}
              label={
                <div className="flex w-full justify-between">
                  {topic}

                  {topicAssessments && (
                    <div>
                      {topicState ? (
                        <CheckCircle color="green"></CheckCircle>
                      ) : (
                        <Pencil color="red"></Pencil>
                      )}
                    </div>
                  )}
                </div>
              }
            >
              <div key={index} className="md:flex">
                <div
                  className={`${topicAssessments ? "md:w-1/2 pr-1" : "w-full"}`}
                >
                  {ApplicationHelper.getFields(topic).map((field, index) => {
                    if (field.field.type === "text") {
                      return (
                        <TextField
                          key={index}
                          label={field.field.label}
                          // @ts-ignore
                          text={application[field.key]}
                        />
                      );
                    }

                    if (field.field.type === "list") {
                      return (
                        <ListField
                          key={index}
                          label={field.field.label}
                          // @ts-ignore
                          list={application[field.key]}
                        />
                      );
                    }

                    if (field.field.type === "mediaArray") {
                      return (
                        <MediaArrayField
                          key={index}
                          label={field.field.label}
                          // @ts-ignore
                          mediaArray={application[field.key]}
                        />
                      );
                    }
                  })}
                </div>
                <div className={`${!!topicAssessments && "md:w-1/2 md:pl-1"}`}>
                  {!!topicAssessments &&
                    topicAssessments.map((topicAssessment, index) => {
                      const details = assessmentDetails[topicAssessment];
                      return (
                        <div
                          key={index}
                          className="bg-gray-300 p-3 rounded-md mb-2"
                        >
                          <h3 className="font-bold pb-2">{details?.label}</h3>

                          <PointsField name={topicAssessment} />

                          <Field
                            as="textarea"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            rows="3"
                            type="text"
                            name={topicAssessment + "Reason"}
                            placeholder="Reasoning"
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </Accordion>
          );
        })}
      </div>
    </Form>
  );
};

export default ApplicationAccordion;

const SubmitButton: React.FC<FormikProps<FormValues>> = (props) => {
  const assessment = props.values;

  const [state, setState] = React.useState<null | IAssessmentRecord>(null);

  const debouncedSubmit = React.useCallback(
    debounce(props.submitForm, 1000),
    []
  );

  React.useEffect(() => {
    if (state) {
      if (isNumberChange(state, props.values as IAssessmentRecord)) {
        props.submitForm();
      } else {
        debouncedSubmit();
      }
    }

    setState(props.values as IAssessmentRecord);
  }, [props.values]);

  return (
    <div
      onClick={props.submitForm}
      className={`fixed top-20 right-10 font-extrabold px-6 py-4 shadow-2xl rounded-xl ${getAssessmentStateColor(
        assessment as IAssessmentRecord
      )}`}
    >
      Status:{" "}
      {AssessmentHelper.getAssessmentState(assessment as IAssessmentRecord)}
    </div>
  );
};

const numberFields = AssessmentHelper.getQuestions().map(
  (item) => item.source as keyof IAssessmentRecord
);

const isNumberChange = (
  oldAssessment: IAssessmentRecord,
  nextAssessment: IAssessmentRecord
) => {
  return numberFields.reduce(
    (acc, item) => (oldAssessment[item] === nextAssessment[item] ? acc : true),
    false
  );
};
