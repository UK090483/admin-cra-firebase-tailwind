import * as React from "react";
import Switch from "../../components/Buttons/Switch/Switch";
import { Spinner } from "components/Spinner/Spinner";

import { useActions } from "../../hooks/useActions";
import { judgeState } from "judges/JudgeTypes";

interface IManageJudgeStatusProps {
  status: judgeState;
  judge_id: string;
}

const ManageJudgeStatus: React.FunctionComponent<IManageJudgeStatusProps> = (
  props
) => {
  const { status, judge_id } = props;
  const [updating, setUpdating] = React.useState(false);

  console.log(status);

  const { updateJudgeStatus } = useActions();

  const handleClick = () => {
    setUpdating(true);
    const nextStatus: judgeState = status === "active" ? "done" : "active";
    updateJudgeStatus({ judge_id, status: nextStatus }).then(() => {
      setUpdating(false);
    });
  };

  return (
    <div className="relative">
      {updating && (
        <div className="absolute  -top-6 -left-6 -right-6 -bottom-6 flex justify-center items-center ">
          <Spinner size="2/3"></Spinner>
        </div>
      )}
      <Switch active={status === "done"} onClick={handleClick} />
    </div>
  );
};

export default ManageJudgeStatus;
