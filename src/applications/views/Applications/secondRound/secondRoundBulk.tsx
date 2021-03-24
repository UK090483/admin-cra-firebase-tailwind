import React from "react";
import { AssessmentHelper } from "assessments/helper/AssessmentHelper";
import useAssessments from "assessments/hooks/useAssessments";
import { Spinner } from "components/Spinner/Spinner";
import { IBulkActionsProps } from "components/Table/types";
import { useFirestore } from "react-redux-firebase";
import { union } from "underscore";
import { ManageJudges } from "../ManageJudges";

const SecondRoundBulk: React.FC<IBulkActionsProps> = (props) => {
  const [updating, setUpdating] = React.useState(false);
  const { bulkItems, data, setBulkItems } = props;
  const firestore = useFirestore();
  const orderedBulkItems = Object.keys(bulkItems).filter((item) => item);
  const bulkItemsCount = orderedBulkItems.length;
  const hasBulkItems = bulkItemsCount > 0;

  const { AssessmentsByApplicationId } = useAssessments();

  const handleClick = async (res: string[]) => {
    interface Obj {
      [k: string]: any;
    }
    const batch: Obj = {};

    data.forEach((dataItem) => {
      if (!bulkItems[dataItem.id]) return;
      const saveItems: string[] = [];
      if (
        AssessmentsByApplicationId &&
        AssessmentsByApplicationId[dataItem.id]
      ) {
        Object.values(AssessmentsByApplicationId[dataItem.id]).forEach(
          (assessment) => {
            if (
              AssessmentHelper.getAssessmentState(assessment) !== "assigned"
            ) {
              saveItems.push(assessment.judge_id);
            }
          }
        );
      }
      const nextAssessment = union(res, saveItems);
      batch[`${dataItem.id}.assessments`] = nextAssessment;
    });

    try {
      await firestore.update({ collection: "tableDoc", doc: "first" }, batch);

      setUpdating(false);
      setBulkItems({});
      return;
    } catch (error) {
      setUpdating(false);
      setBulkItems({});
      return;
    }
  };

  return (
    <div
      style={{ width: "fit-content" }}
      className={`${
        hasBulkItems ? "max-h-64" : "max-h-0"
      } mb-6 transition-all  overflow-hidden relative  `}
    >
      {updating && (
        <div className="absolute  top-0 right-0  z-30 bottom-0 flex justify-center items-center ">
          <Spinner size="1/2"></Spinner>
        </div>
      )}
      <ManageJudges handleClick={handleClick} />
    </div>
  );
};

export default SecondRoundBulk;
