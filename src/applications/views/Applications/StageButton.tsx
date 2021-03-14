/*eslint-disable*/
import React from "react";

import { Users, AcademicCap, Hashtag } from "heroicons-react";

import useUi from "hooks/useUi";
import Button from "components/Buttons/Button";
import Popup from "reactjs-popup";

const stages = {
  first_filter: "Spreu vom Weizen...",
  assign_prejudges: "Judges Zuteilen...",
  first_evaluation: "Auswertung PreJudges...",
  final_evaluation: "Finale Auswertung...",
};

interface IStageButton {}
const StageButton: React.FC<IStageButton> = () => {
  const { stage, setStage } = useUi();

  return (
    <div className="-mt-7 mb-3">
      <Popup
        contentStyle={{
          width: "fit-content",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
        trigger={
          <div className="flex text-actionColor-600">
            <Hashtag />
            {stages[stage]}
          </div>
        }
        position="bottom left"
      >
        {(close: () => void) => (
          <div className="flex flex-col ">
            {Object.entries(stages).map(([key, value]) => (
              <Button
                key={key}
                className="w-60"
                active={stage === key}
                onClick={() => {
                  // @ts-ignore
                  setStage(key), close();
                }}
              >
                {value}
              </Button>
            ))}
          </div>
        )}
      </Popup>
    </div>
  );
};

export default StageButton;
