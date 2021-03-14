import * as React from "react";
import Popup from "reactjs-popup";
import { ManageJudges } from "../ManageJudges";
import Chip from "components/Avatars/Chip";
import { IApplicationAssessment } from "applications/ApplicationTypes";
import useApplicationActions from "applications/hooks/useApplicationActions";
import { IRow } from "components/Table/types";
interface IManageJudgesChipProps {
  row: IRow;
}

const ManageJudgesChip: React.FunctionComponent<IManageJudgesChipProps> = ({
  row,
}) => {
  const { updateApplicationAssessments } = useApplicationActions();

  const handleJudges = (judges: IApplicationAssessment) => {
    const assessments: IApplicationAssessment = Object.keys(judges).reduce(
      (acc, item) => ({
        ...acc,
        [item]: { judge_id: item, application_id: row.id },
      }),
      {}
    );

    updateApplicationAssessments({
      oldAssessments: row.assessments ? row.assessments : {},
      assessments,
      id: row.id,
    });
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
        <div>
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
