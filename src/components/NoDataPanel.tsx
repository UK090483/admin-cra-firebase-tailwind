import * as React from "react";
import ActionButton from "./Buttons/ActionButton";

interface INoDataPannelProps {
  text?: string;
  createPath?: string;
}

const NoDataPanel: React.FunctionComponent<INoDataPannelProps> = ({
  text,
  createPath,
}) => {
  return (
    <div className=" h-64 w-full text-white bg-actionColor-300 font-extrabold text-3xl flex justify-center items-center shadow-2xl rounded-xl flex-wrap">
      <div className="mr-10">{text ? text : "No Data Yet..."} </div>

      {createPath && <ActionButton size="m" type="create" path={createPath} />}
    </div>
  );
};

export default NoDataPanel;
