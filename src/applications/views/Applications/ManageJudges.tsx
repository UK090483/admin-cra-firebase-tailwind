import * as React from "react";
import useJudges from "judges/hooks/useJudges";
import Chip from "components/Avatars/Chip";
import Button from "components/Buttons/Button";

import { useEffect } from "react";
import { IApplicationAssessment } from "applications/ApplicationTypes";
import { CheckCircle } from "heroicons-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Reducers/RootReducer";

export interface IManageJudgesProps {
  handleClick: (selected: IApplicationAssessment) => void;
  preselected?: IApplicationAssessment;
  type?: "pre" | "main";
}

interface selectedState {
  [key: string]: boolean;
}

export function ManageJudges(props: IManageJudgesProps) {
  const { handleClick, preselected, type = "pre" } = props;
  const [selected, setSelected] = React.useState<selectedState | null>(null);
  const { judgesOrdered } = useJudges();

  const filteredJudges = judgesOrdered.filter(
    (judge) => judge.judgeType === type
  );

  interface Entries {
    [k: string]: number;
  }

  const assessmentCountByJudgeId = useSelector((state: RootState) =>
    Object.entries(state.applications.assessmentsByJudgeId).reduce(
      (acc, [key, val]) => ({ ...acc, [key]: Object.entries(val).length }),
      {} as Entries
    )
  );

  console.log(assessmentCountByJudgeId);

  useEffect(() => {
    if (preselected) {
      setSelected(
        Object.keys(preselected).reduce(
          (acc, item) => ({ ...acc, [item]: item }),
          {}
        )
      );
    }
  }, [preselected]);

  const handleUpdate = () => {
    const nextJudges = filteredJudges.reduce((acc, item) => {
      if (item.id && selected && selected[item.id]) {
        return { ...acc, [item.id]: item };
      }
      return acc;
    }, {});

    handleClick(nextJudges);
  };

  const getJudges = () => {
    return filteredJudges.map((judge) => (
      <div
        data-testid={"manageJudges_select"}
        key={judge.id}
        className=" w-12 mr-3  py-2 flex-row justify-center items-center relative"
        onClick={() => {
          setSelected(
            selected
              ? {
                  ...selected,
                  [judge.id]: !!!selected[judge.id],
                }
              : { [judge.id]: true }
          );
        }}
      >
        <Chip color={judge.color} name={judge.name} />

        {assessmentCountByJudgeId[judge.id]
          ? assessmentCountByJudgeId[judge.id]
          : 0}

        {selected && !!selected[judge.id] && (
          <CheckCircle
            className={"absolute top-0 right-0 text-green-500 fadeIn"}
          ></CheckCircle>
        )}
      </div>
    ));
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
