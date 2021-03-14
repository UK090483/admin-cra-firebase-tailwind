import * as React from "react";
import { FormikErrors } from "formik";
import { FormValues } from "../Form";

import Text from "./Text";
import ColorInput from "components/Inputs/ColorInput/ColorInput";
import Select from "./Select";
import Points from "./points";

interface IFieldInputProps {
  label: string;
  errors: FormikErrors<FormValues>;
  [key: string]: any;
  type: "text" | "email" | "checkbox" | "color" | "select" | "points";
}

const Field: React.FunctionComponent<IFieldInputProps> = (props) => {
  const getField = (): JSX.Element => {
    switch (props.type) {
      case "text":
        return <Text {...props} />;
      case "email":
        return <Text {...props} />;
      case "checkbox":
        return <Text {...props} />;
      case "color":
        return <ColorInput {...props} />;
      case "select":
        return <Select {...props} />;
      case "points":
        return <Points {...props} />;
      default:
        return <h1>No appropiet field for type</h1>;
    }
  };
  return <>{getField()}</>;
};

export default Field;
