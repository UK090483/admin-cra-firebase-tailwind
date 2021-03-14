import * as React from "react";
import { Field, FormikErrors, FormikHelpers, useField } from "formik";

import { Star } from "heroicons-react";

interface IPointsProps {
  name: string;
}

const color = "grey";
const activeColor = "red";

const PointsField: React.FunctionComponent<IPointsProps> = (props) => {
  const [field, meta, helpers] = useField(props);

  const handleClick = (number: number) => {
    helpers.setValue(number);
  };

  const points = field.value;

  return (
    <label className="block">
      <div className="flex">
        <Star
          size={40}
          onClick={() => {
            handleClick(1);
          }}
          color={`${points >= 1 ? activeColor : color}`}
        ></Star>
        <Star
          size={40}
          onClick={() => {
            handleClick(2);
          }}
          color={`${points >= 2 ? activeColor : color}`}
        ></Star>
        <Star
          size={40}
          onClick={() => {
            handleClick(3);
          }}
          color={`${points >= 3 ? activeColor : color}`}
        ></Star>
        <Star
          size={40}
          onClick={() => {
            handleClick(4);
          }}
          color={`${points >= 4 ? activeColor : color}`}
        ></Star>
      </div>
    </label>
  );
};

export default PointsField;
