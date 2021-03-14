import * as React from "react";
import { Field, useField } from "formik";
import { FormValues } from "../Form";

interface ISelectOptions {
  value: string;
  label: string;
}

interface ISelectInputProps {
  label: string;
  [key: string]: any;
  options: ISelectOptions[];
}

const SelectInput: React.FunctionComponent<ISelectInputProps> = ({
  label,
  name,
  options = [],
}) => {
  const formik = useField(name);

  const [fieldInput, meta, helper] = formik;

  const { error } = meta;

  return (
    <label className="block py-2">
      <span className="text-gray-700">
        {label}
        {error && <span className="text-xs text-red-500 pl-9">{error}</span>}
      </span>

      <Field
        as="select"
        className="mt-1 p-3 block  w-60 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        name={name}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value && o.value}>
            {o.label}
          </option>
        ))}
      </Field>
    </label>
  );
};

export default SelectInput;
