import { ApplicationHelper } from "applications/helper/ApplicationHelper";
import Field from "components/Form/fields/Field";
import Form, { FormValues } from "components/Form/Form";
import React from "react";
import { useParams } from "react-router-dom";
import { RoutingParam } from "types";
import useApplicationById from "../../hooks/useApplicationById";
import TextInput from "../../../components/Form/FormInputs/TextInput";
import { FormikProps } from "formik";
import Button from "components/Buttons/Button";
import useApplicationActions from "../../hooks/useApplicationActions";
import { IApplicationUpdateAbles } from "applications/ApplicationTypes";
import FormBuilder from "components/Form/FormBuilder";

const ApplicationUpdate: React.FC = () => {
  let { id } = useParams<RoutingParam>();
  const application = useApplicationById(id);

  const { updateApplication } = useApplicationActions();

  const initValues = application ? application : [];

  return (
    <>
      <h1>Update</h1>
      <Form
        initialValues={initValues}
        submitButton={(props) => <SubmitButton {...props} />}
        formFields={[]}
        onSubmit={(v, helpers) => {
          updateApplication({ id: id, data: v as IApplicationUpdateAbles });
          helpers.setSubmitting(false);
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
                  // <TextInput
                  //   name={field.key}
                  //   label={field.field.label}
                  //   textarea={true}
                  // ></TextInput>
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
  const assessment = props.values;

  return (
    <div
      className={`fixed top-20 right-10   font-extrabold px-6 py-4 shadow-2xl rounded-xl `}
    >
      <Button onClick={props.submitForm} disabled={!props.dirty}>
        Save
      </Button>
    </div>
  );
};
