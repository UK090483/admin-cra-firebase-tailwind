import * as React from "react";
import Popup from "reactjs-popup";
import { ManageJudges } from "../ManageJudges";
import Chip from "components/Avatars/Chip";

import { IRow } from "components/Table/types";
import useAssessments from "assessments/hooks/useAssessments";
import { AssessmentHelper } from "assessments/helper/AssessmentHelper";
import { useFirestore } from "react-redux-firebase";
import { Spinner } from "components/Spinner/Spinner";

interface IManageJudgesChipProps {
  row: IRow;
}

const ManageJudgesChip: React.FunctionComponent<IManageJudgesChipProps> = ({
  row,
}) => {
  const firestore = useFirestore();
  const [updating, setUpdating] = React.useState(false);
  const { AssessmentsByApplicationId } = useAssessments();
  const assessments =
    AssessmentsByApplicationId && AssessmentsByApplicationId[row.id];
  const getBlockedAssessments = () => {
    if (!assessments) return [];
    const res: string[] = [];
    Object.values(assessments).forEach((ass) => {
      AssessmentHelper.getAssessmentState(ass) !== "assigned" &&
        res.push(ass.judge_id);
    });

    return res;
  };

  const handleJudges = async (nextAssessments: string[]) => {
    setUpdating(true);

    try {
      firestore.update(
        { collection: "tableDoc", doc: "first" },
        { [`${row.id}.assessments`]: nextAssessments }
      );
      setUpdating(false);
    } catch (error) {
      setUpdating(false);
    }
  };
  return (
    <Popup
      contentStyle={{
        width: "fit-content",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
      trigger={
        <div className="relative">
          {updating && (
            <div className="absolute  -top-10 -left-12 -right-10 -bottom-10 flex justify-center items-center ">
              <Spinner size="2/3"></Spinner>
            </div>
          )}
          <Chip
            name={"+"}
            color={"bg"}
            className="-ml-2  bg-gray-500 hover:bg-black cursor-pointer"
          />
        </div>
      }
      position="bottom center"
    >
      {(close: () => void) => (
        <ManageJudges
          blockedAssessments={getBlockedAssessments()}
          preselected={row.assessments}
          handleClick={(res) => {
            handleJudges(res);
            close();
          }}
        />
      )}
    </Popup>
  );
};

export default ManageJudgesChip;
