import * as React from "react";

interface ISwitchProps {
  active: boolean;
  onClick: () => void;
}

const Switch: React.FC<ISwitchProps> = (props) => {
  const { active, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={`w-10 h-6 flex items-center  ${
        active ? "bg-actionColor-400" : "bg-gray-300"
      } rounded-full p-1 transition-all`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-2xl transform  ${
          active ? "translate-x-4" : ""
        } transition-all`}
      ></div>
    </div>
  );
};

export default Switch;
