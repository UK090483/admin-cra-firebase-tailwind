import { Plus, Pencil } from "heroicons-react";
import * as React from "react";
import { useHistory } from "react-router-dom";
import Button from "./Button";

export interface IActionButtonProps {
  path: string;
  type: "create" | "update";
  size?: "s" | "m";
}

const ActionButton: React.FC<IActionButtonProps> = (props) => {
  const { path, type, size = "m" } = props;
  const history = useHistory();
  return (
    <div className="flex justify-end -mt-6 -mb-6 ">
      <Button
        className={` ${
          size === "s" ? "w-10 h-10" : "w-12 h-12"
        } rounded-full  `}
        onClick={() => history.push(path)}
      >
        {type === "create" ? (
          <Plus size={size === "s" ? 18 : 24} />
        ) : (
          <Pencil size={size === "s" ? 18 : 24} />
        )}
      </Button>
    </div>
  );
};

export default ActionButton;
