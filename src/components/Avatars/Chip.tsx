import { AssessmentStatus } from "assessments/types";
import * as React from "react";

interface IChipProps {
  color?: string;
  name?: string;
  className?: string;
  state?: "assigned" | "processed" | "completed";
  status?: AssessmentStatus;
}

const Chip: React.FC<IChipProps> = (props) => {
  const { name, color, className, state = "assigned", status } = props;

  return (
    <div
      className={`${color}   rounded-full ring-2  ${
        state === "assigned"
          ? "ring-gray-200"
          : state === "processed"
          ? "ring-pink-400"
          : "ring-green-500"
      } ${
        status === "hidden" ? "opacity-40 text-red-400" : "text-white"
      } text-xs border-solid border-2  p-0 w-8 h-8 flex justify-center items-center font-extrabold m-0 hover:z-10 ${className}`}
    >
      {name && getInitials(name)}
    </div>
  );
};

export default Chip;

Chip.defaultProps = {
  color: "bg-blue-600",
  name: "N N",
  className: "",
};

var getInitials = function (string: string) {
  var names = string.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};
