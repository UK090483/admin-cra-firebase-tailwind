import * as React from "react";
import { Field, FormikErrors } from "formik";
import { FormValues } from "../Form";

interface ISelectInputProps {
  label: string;
  errors: FormikErrors<FormValues>;
  [key: string]: any;
  options?: any;
}

const Select: React.FunctionComponent<ISelectInputProps> = ({
  label,
  errors,
  placeholder,
  name,
  options,
  ...rest
}) => {
  const selectOptions = options && options.options ? options.options : [];
  return (
    <label className="block py-2">
      <span className="text-gray-700">
        {label}
        {errors[name] && (
          <span className="text-xs text-red-500 pl-9">{errors[name]}</span>
        )}
      </span>

      <Field
        as="select"
        className="mt-1 p-3 block  w-60 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        name={name}
        {...rest}
      >
        {selectOptions.map((o: any) => (
          <option key={o.value} value={o.value && o.value}>
            {o.label}
          </option>
        ))}
      </Field>
    </label>
  );
};

export default Select;
