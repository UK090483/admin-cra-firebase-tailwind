import * as React from "react";
import Switch from "../../components/Buttons/Switch/Switch";
import { useSetApplicationStatus } from "../../applications/state/applicationActions";
import { AssessmentStatus } from "assessments/types";

interface IManageAssessmentStatusProps {
  active: boolean;
  judge_id: string;
  application_id: string;
}

const ManageAssessmentStatus: React.FunctionComponent<IManageAssessmentStatusProps> = (
  props
) => {
  const { active, judge_id, application_id } = props;

  const setApplicationStatus = useSetApplicationStatus();

  const nextStatus: AssessmentStatus = active ? "hidden" : "created";

  return (
    <div>
      <Switch
        active={active}
        onClick={() => {
          setApplicationStatus(application_id, judge_id, nextStatus);
        }}
      />
    </div>
  );
};

export default ManageAssessmentStatus;
