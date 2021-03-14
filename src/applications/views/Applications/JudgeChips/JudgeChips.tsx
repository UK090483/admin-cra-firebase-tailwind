import * as React from "react";
import { IRow } from "components/Table/types";
import Chip from "components/Avatars/Chip";
import Popup from "reactjs-popup";
import useJudges from "judges/hooks/useJudges";
import { AssessmentHelper } from "assessments/helper/AssessmentHelper";
import ManageJudgesChip from "./ManageJudgesChip";
import { IAssessmentRecord } from "../../../../assessments/types";

export interface IJudgeChipsProps {
  row: IRow;
  withManage?: boolean;
  type?: "pre" | "main";
}

const JudgeChips: React.FC<IJudgeChipsProps> = (props) => {
  const { row, withManage = false, type = "pre" } = props;

  const rawAssessments = row.assessments
    ? (row.assessments as IAssessmentRecord[])
    : null;

  const { judges } = useJudges();

  const assessments =
    judges && rawAssessments
      ? Object.values(rawAssessments).reduce((acc: any[], item) => {
          if (
            !item.judge_id ||
            !judges[item.judge_id] ||
            judges[item.judge_id].judgeType !== type
          ) {
            return [...acc];
          }

          return [
            ...acc,
            {
              judge: judges[item.judge_id],
              sum: item.sum,
              status: item.status,
              state: AssessmentHelper.getAssessmentState(item),
            },
          ];
        }, [])
      : [];

  return (
    <div
      className="flex flex-wrap"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {assessments.map((assessment, index) => (
        <Popup
          key={index}
          contentStyle={{
            width: "fit-content",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            color: "white",
          }}
          trigger={
            <div>
              <Chip
                status={assessment.status}
                state={assessment.state}
                key={assessment.judge.name}
                name={assessment.judge.name}
                color={assessment.judge.color}
                className="-ml-2 "
              />
            </div>
          }
          on="hover"
          position="top center"
        >
          {assessment.sum}
        </Popup>
      ))}
      {withManage && <ManageJudgesChip row={row} />}
    </div>
  );
};
export default JudgeChips;
