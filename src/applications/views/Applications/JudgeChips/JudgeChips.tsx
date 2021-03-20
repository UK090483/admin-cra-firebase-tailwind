import * as React from "react";
import { IRow } from "components/Table/types";
import Chip from "components/Avatars/Chip";
import Popup from "reactjs-popup";
import useJudges from "judges/hooks/useJudges";
import { AssessmentHelper } from "assessments/helper/AssessmentHelper";
import ManageJudgesChip from "./ManageJudgesChip";
import { IAssessmentRecord } from "assessments/types";
import useUi from "../../../../hooks/useUi";
import { getSumIn100 } from "../../../../helper/round";

export interface IJudgeChipsProps {
  row: IRow;
  withManage?: boolean;
  type?: "pre" | "main";
}

const JudgeChips: React.FC<IJudgeChipsProps> = ({
  row,
  withManage = false,
  type = "pre",
}) => {
  const { judges } = useJudges();

  const { sumIn100 } = useUi();

  let assessments = row.assessments ? (row.assessments as string[]) : [];
  if (type === "main" && judges) {
    const res: string[] = [];
    Object.values(judges).forEach((judge) => {
      if (judge.judgeType === "pre") return;
      if (!judge.assessments) return;

      if (Object.keys(judge.assessments).includes(row.id)) {
        res.push(judge.id);
      }
    });
    assessments = res;
  }

  if (!judges) return <div>Load...</div>;

  const getChip = () => {
    return assessments.map((assessment, index) => {
      const judge = judges[assessment];
      if (!judge) {
        console.error("can not find judge in JudgeChip Component");
        return null;
      }

      const judgeAssessment = judge.assessments
        ? (judge.assessments[row.id] as IAssessmentRecord)
        : undefined;

      if (judge.judgeType !== type) return null;

      const sum =
        judgeAssessment &&
        AssessmentHelper.sumAssessmentPoints(judgeAssessment);

      const sumPrepared = sum && (sumIn100 ? getSumIn100(sum) : sum);

      const ChipInner = () => {
        return (
          <div>
            <Chip
              status={judgeAssessment && judgeAssessment.status}
              state={
                judgeAssessment &&
                AssessmentHelper.getAssessmentState(judgeAssessment)
              }
              name={judge.name}
              color={judge.color}
              className="-ml-2 "
            />
          </div>
        );
      };

      if (sumPrepared) {
        return (
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
            trigger={ChipInner()}
            on="hover"
            position="top center"
          >
            {sumPrepared && sumPrepared}
          </Popup>
        );
      }

      return ChipInner();
    });
  };

  return (
    <div
      className="flex flex-wrap"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {getChip()}
      {withManage && <ManageJudgesChip row={row} />}
    </div>
  );
};
export default JudgeChips;
