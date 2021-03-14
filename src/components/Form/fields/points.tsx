import * as React from "react";
import { Field, FormikErrors, FormikHelpers } from "formik";
import { FormValues } from "../Form";
import { Star } from "heroicons-react";

interface ITextInputProps {
  label: string;
  errors: FormikErrors<FormValues>;
  [key: string]: any;
}

const color = "grey";
const activeColor = "red";

const Points: React.FunctionComponent<ITextInputProps> = (props) => {
  const {
    label,
    errors,
    name,
    formik: { getFieldHelpers, values },
  } = props;

  const points = values[name];

  const { setValue } = getFieldHelpers(name);

  const handleClick = (number: number) => {
    setValue(number);
  };

  return (
    <label className="block">
      <span className="text-gray-700">
        {label}
        {errors[name] && (
          <span className="text-xs text-red-500 pl-9">{errors[name]}</span>
        )}
      </span>

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

export default Points;
