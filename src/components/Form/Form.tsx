import { Formik, Form, FormikHelpers, FormikErrors, FormikProps } from "formik";
import Button from "components/Buttons/Button";
import React from "react";
import Field from "./fields/Field";
import { JsxElement } from "typescript";

export interface FormValues {
  [k: string]: any;
}

export interface FormField {
  type: "text" | "email" | "checkbox" | "color" | "points";
  validation?: (value: string) => string | undefined;
  label: string;
  name: string;
  initialValue?: any;
  placeholder?: string;
  options?: any;
}

export type FormFields = FormField[];

interface IFormProps {
  formFields: FormField[];
  onSubmit: (values: FormValues, helpers: FormikHelpers<FormValues>) => void;
  submitLabel?: string;
  submitButton?: (props: FormikProps<FormValues>) => JSX.Element;
  initialValues?: FormValues;
}

const CustomForm: React.FunctionComponent<IFormProps> = ({
  formFields,
  submitLabel,
  onSubmit,
  children,
  submitButton,
  initialValues = {},
}) => {
  return (
    <div>
      <Formik
        initialValues={{
          ...formFields.reduce(
            (acc, field) => ({
              ...acc,
              [field.name]: field.initialValue || "",
            }),
            {}
          ),
          ...initialValues,
        }}
        onSubmit={(values: FormValues, helpers) => {
          onSubmit(values, helpers);
        }}
        validate={(values: FormValues) => {
          let errors: FormikErrors<FormValues> = {};

          formFields.forEach((field) => {
            if (field.validation) {
              // @ts-ignore
              const err = field.validation(values[field.name]);

              if (err) {
                errors[field.name] = err;
              }
            }
          });
          return errors;
        }}
      >
        {(props) => {
          const { errors, isValid, dirty, ...rest } = props;
          return (
            <Form>
              {formFields.map((field) => (
                <Field
                  key={field.name}
                  errors={errors}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  options={field.options}
                  formik={rest}
                />
              ))}

              {children}

              {submitButton ? (
                submitButton(props)
              ) : (
                <Button disabled={!dirty || !isValid} type="submit">
                  {submitLabel || "Submit"}
                </Button>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CustomForm;
