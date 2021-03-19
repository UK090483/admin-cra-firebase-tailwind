import { Field, useField } from "formik";
import * as React from "react";

export interface ITextInputProps {
  label: string;
  placeholder?: string;
  name: string;
  textarea?: boolean;
}

const TextInput: React.FunctionComponent<ITextInputProps> = ({
  label,
  placeholder,
  textarea,
  name,
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
        placeholder
        as={textarea ? "textarea" : ""}
        className="mt-1 p-3 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        name={name}
      />
    </label>
  );
};

export default TextInput;
