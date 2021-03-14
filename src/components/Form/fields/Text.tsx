import * as React from "react";
import { Field, FormikErrors } from "formik";
import { FormValues } from "../Form";

interface ITextInputProps {
  label: string;
  errors: FormikErrors<FormValues>;
  [key: string]: any;
}

const Text: React.FunctionComponent<ITextInputProps> = ({
  label,
  errors,
  placeholder,
  name,
  ...rest
}) => {
  return (
    <label className="block py-2">
      <span className="text-gray-700">
        {label}
        {errors[name] && (
          <span className="text-xs text-red-500 pl-9">{errors[name]}</span>
        )}
      </span>

      <Field
        className="mt-1 p-3 block  rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        name={name}
        {...rest}
      />
    </label>
  );
};

export default Text;
