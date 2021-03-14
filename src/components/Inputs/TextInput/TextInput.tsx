import * as React from "react";

interface ITextInputProps {
  label: string;
  placeholder?: string;
  [key: string]: any;
}

const TextInput: React.FunctionComponent<ITextInputProps> = ({
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
        className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        placeholder={placeholder}
        {...rest}
      />
    </label>
  );
};

export default TextInput;
