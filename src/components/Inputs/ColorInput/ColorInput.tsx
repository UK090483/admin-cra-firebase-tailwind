import * as React from "react";
import { JUDGE_COLORS } from "../../../misc/constants";

interface ColorInputProps {
  formik?: any;
  name?: string;
}

const ColorInput: React.FC<ColorInputProps> = (props) => {
  const [state, setState] = React.useState("");

  const {
    name,
    formik: { setFieldValue, values },
  } = props;

  const currentValue =
    values && typeof values === "object" && name ? values[name] : undefined;

  const handle = (c: string) => {
    setFieldValue(name, c);
  };
  return (
    <div className="flex flex-wrap justify-start  rounded-lg py-4">
      {JUDGE_COLORS.map((color, index) => {
        return (
          <div key={index}>
            <Color
              active={currentValue}
              onClick={handle}
              c={`bg-${color}-200`}
            />
            <Color
              active={currentValue}
              onClick={handle}
              c={`bg-${color}-400`}
            />
            <Color
              active={currentValue}
              onClick={handle}
              c={`bg-${color}-600`}
            />
            <Color
              active={currentValue}
              onClick={handle}
              c={`bg-${color}-900`}
            />
          </div>
        );
      })}
    </div>
  );
};

interface IColorProps {
  c: string;
  active: string;
  onClick: (c: string) => void;
}

const Color: React.FC<IColorProps> = ({ c, onClick, active }) => {
  return (
    <div
      onClick={() => onClick(c)}
      className={`w-12 h-12 m-1.5 transition-all duration-200 rounded-lg  shadow-md   ${c} ${
        c === active &&
        "border-4 shadow-2xl border-black rounded-full ring-2 ring-offset-red-50"
      } `}
    />
  );
};

export default ColorInput;

const colors = ["pink", "purple", "indigo", "blue", "green", "yellow", "red"];
