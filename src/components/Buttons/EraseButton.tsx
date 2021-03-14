import * as React from "react";
import { X } from "heroicons-react";
import Popup from "reactjs-popup";

export interface IEraseProps {
  onClick: () => void;
}

const EraseButton: React.FC<IEraseProps> = (props) => {
  const { onClick } = props;

  return (
    <div className="flex justify-end -mt-6 -mb-6">
      <Popup
        trigger={
          <button
            className={` ${"w-12 h-12"} rounded-full bg-red-400 flex justify-center items-center `}
            onClick={() => onClick()}
          >
            <X />
          </button>
        }
        modal
      >
        <div className="w-32 h-32 ">
          <span> wird noch gebaut </span>
        </div>
      </Popup>
    </div>
  );
};

export default EraseButton;
