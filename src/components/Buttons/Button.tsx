import * as React from "react";

interface IButtonProps {
  [name: string]: any;
  size?: "s" | "m" | "l";
  active?: boolean;
  disabled?: boolean;
}

const Button: React.FunctionComponent<IButtonProps> = (props) => {
  const { size = "m", active = false, className, disabled, ...rest } = props;
  return (
    <button
      className={`${active ? "bg-actionColor-700" : " bg-actionColor-400"} 
      ${
        size === "s"
          ? "px-3 py-1 text-xs"
          : size === "m"
          ? "px-3 py-1 "
          : "px-3 py-1 text-lg"
      } px-3 py-1 rounded-sm shadow-2xl  text-white ring-blue-500 my-0.5 
       
      ${disabled ? "opacity-50 " : ""}  ${className ? className : ""}
      `}
      {...rest}
    >
      {props.children}
    </button>
  );
};

export default React.memo(Button);
