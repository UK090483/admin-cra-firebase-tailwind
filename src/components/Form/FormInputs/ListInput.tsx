import * as React from "react";
import { Field, FormikErrors, useField } from "formik";
import { FormValues } from "../Form";

export interface IListInputProps {
  label: string;
  name: string;
}

const ListInput: React.FunctionComponent<IListInputProps> = ({
  label,
  name,
}) => {
  const formik = useField(name);

  const [fieldInput, meta, helper] = formik;

  const { error, value } = meta;

  if (!Array.isArray(value)) {
    return (
      <p className="text-xs text-red-500 pl-9">{`input with name:${name} is no Array`}</p>
    );
  }

  return (
    <label className="block py-2">
      <span className="text-gray-700">
        {label}
        {error && <span className="text-xs text-red-500 pl-9">{error}</span>}
      </span>
      <span className="text-xs text-red-500 pl-9">{"not changeable yet"}</span>
      <div className="py-6 flex flex-wrap">
        {value.map((item) => (
          <span
            key={item}
            className="text-white  mr-1 px-3 py-2 bg-actionColor-500"
          >
            {item}
          </span>
        ))}
      </div>
    </label>
  );
};

export default ListInput;
