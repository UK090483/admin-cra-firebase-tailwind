import * as React from "react";

interface ITextFieldProps {
  label: string;
  text: string;
}

const TextField: React.FunctionComponent<ITextFieldProps> = (props) => {
  const { label, text } = props;
  return (
    <div className="bg-gray-300 p-4 rounded-md mb-2">
      <h4 className="font-bold text-lg pb-3">{label}</h4>
      <p>{text}</p>
    </div>
  );
};

export default TextField;
