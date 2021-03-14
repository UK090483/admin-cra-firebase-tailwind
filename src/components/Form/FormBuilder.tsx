import * as React from "react";

import TextInput from "./FormInputs/TextInput";
import SelectInput from "./FormInputs/SelectInput";

interface IFormBuilderField {
  type: "text" | "email" | "checkbox" | "color" | "select" | "points";
  props: any;
}

interface IFormBuilderProps {
  fields: IFormBuilderField[];
}

const FormBuilder: React.FunctionComponent<IFormBuilderProps> = (props) => {
  const { fields } = props;

  const getField = (field: IFormBuilderField): JSX.Element => {
    switch (field.type) {
      case "text":
        return <TextInput {...field.props} />;
      case "select":
        return <SelectInput {...field.props} />;

      default:
        return <h1>No appropiet field for type</h1>;
    }
  };
  return <>{fields.map((field) => getField(field))}</>;
};

export default FormBuilder;
