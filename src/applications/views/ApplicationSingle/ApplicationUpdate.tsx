import { IApplicationUpdateAbles } from "applications/ApplicationTypes";
import { ApplicationHelper } from "applications/helper/ApplicationHelper";
import useApplication from "applications/hooks/useApplication";
import Button from "components/Buttons/Button";
import Form, { FormValues } from "components/Form/Form";
import { Spinner } from "components/Spinner/Spinner";
import { FormikProps } from "formik";
import React from "react";
import { useParams } from "react-router-dom";
import { RoutingParam } from "types";
import useApplicationActions from "../../hooks/useApplicationActions";

const ApplicationUpdate: React.FC = () => {
  let { id } = useParams<RoutingParam>();
  const { updateApplication } = useApplicationActions();
  const { application } = useApplication(id);

  if (!application) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner size="1/3"></Spinner>
      </div>
    );
  }

  return (
    <>
      <h1>Update</h1>
      <Form
        initialValues={application}
        submitButton={(props) => <SubmitButton {...props} />}
        formFields={[]}
        onSubmit={(v, helpers) => {
          updateApplication({
            id: id,
            data: v as IApplicationUpdateAbles,
          }).then(() => {
            console.log("updated");
            helpers.setSubmitting(false);
            helpers.resetForm({ values: v });
          });
        }}
      >
        {ApplicationHelper.getTopics().map((topic) => {
          return (
            <div className="p-8 bg-gray-200 shadow-2xl rounded-lg mb-8">
              <span className="text-2xl font-extrabold">{topic}</span>

              {ApplicationHelper.getFields(topic).map((field) => {
                return field.field.input ? (
                  field.field.input
                ) : (
                  <div>missing Input</div>
                );
              })}
            </div>
          );
        })}
      </Form>
    </>
  );
};

export default ApplicationUpdate;

const SubmitButton: React.FC<FormikProps<FormValues>> = (props) => {
  const { dirty, isSubmitting } = props;

  return (
    <div
      className={`fixed top-20 right-10   font-extrabold px-6 py-4 shadow-2xl rounded-xl `}
    >
      {isSubmitting && (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <Spinner size="2/3" />
        </div>
      )}

      {dirty && (
        <Button onClick={props.submitForm} disabled={!props.dirty}>
          Save
        </Button>
      )}
    </div>
  );
};
