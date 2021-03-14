import * as React from "react";

interface IBooleanInputProps {
  label: string;
  placeholder?: string;
  [key: string]: any;
}

const BooleanInput: React.FunctionComponent<IBooleanInputProps> = ({
  label,
  error,
  placeholder,
  ...rest
}) => {
  return (
    <label className="block">
      <span className="text-gray-700">
        {label}
        {error && <span className="text-xs text-red-500 pl-9">{error}</span>}
      </span>

      <input
        type="checkbox"
        className="form-checkbox  text-gray-600 "
        {...rest}
      />
    </label>
  );
};

export default BooleanInput;
