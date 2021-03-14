import * as React from "react";

import TextInput, { ITextInputProps } from "./FormInputs/TextInput";
import SelectInput from "./FormInputs/SelectInput";

interface IInputProps {
  type: string;
  options: any;
}

const Input: React.FunctionComponent<IInputProps> = (props) => {
  const { type, options } = props;

  const getField = (): JSX.Element => {
    switch (type) {
      //   case "text":
      //     return <TextInput />;
      //   case "select":
      //     return <SelectInput />;

      default:
        return <h1>No appropiet field for type</h1>;
    }
  };

  return <></>;
};

export default Input;
