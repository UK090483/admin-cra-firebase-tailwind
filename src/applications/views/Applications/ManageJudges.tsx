import Chip from "components/Avatars/Chip";
import Button from "components/Buttons/Button";
import { CheckCircle } from "heroicons-react";
import useJudges from "judges/hooks/useJudges";
import * as React from "react";

export interface IManageJudgesProps {
  handleClick: (selected: string[]) => void;
  preselected?: string[];
  blockedAssessments?: string[];
  type?: "pre" | "main";
}

export function ManageJudges(props: IManageJudgesProps) {
  const {
    handleClick,
    preselected,
    type = "pre",
    blockedAssessments = [],
  } = props;
  const [selected, setSelected] = React.useState<string[]>(
    preselected ? preselected : []
  );
  const { judgesOrdered } = useJudges();

  const filteredJudges =
    judgesOrdered && judgesOrdered.filter((judge) => judge.judgeType === type);

  const handleUpdate = () => {
    handleClick(selected);
  };

  const getJudges = () => {
    return (
      filteredJudges &&
      filteredJudges.map((judge) => {
        const assessmentCount = judge.assessments
          ? Object.keys(judge.assessments).length
          : 0;

        return (
          <div
            data-testid={"manageJudges_select"}
            key={judge.id}
            className=" w-12 mr-3  py-2 flex-row justify-center items-center relative"
            onClick={() => {
              if (blockedAssessments.includes(judge.id)) return;
              setSelected((oldState) =>
                oldState.includes(judge.id)
                  ? [...oldState.filter((jId) => jId !== judge.id)]
                  : [...oldState, judge.id]
              );
            }}
          >
            <Chip color={judge.color} name={judge.name} />

            {assessmentCount}

            {selected.includes(judge.id) && (
              <CheckCircle
                className={"absolute top-0 right-0 text-green-500 fadeIn"}
              ></CheckCircle>
            )}
          </div>
        );
      })
    );
  };

  return (
    <div className="flex justify-items-center items-center">
      {getJudges()}
      <Button data-testid="manageJudges_submit" onClick={handleUpdate}>
        Zuweisen
      </Button>
    </div>
  );
}
