import * as React from "react";
import Switch from "../../components/Buttons/Switch/Switch";
import { AssessmentStatus } from "assessments/types";
import { useFirestore } from "react-redux-firebase";
import { Spinner } from "components/Spinner/Spinner";

interface IManageAssessmentStatusProps {
  active: boolean;
  judge_id: string;
  application_id: string;
}

const ManageAssessmentStatus: React.FunctionComponent<IManageAssessmentStatusProps> = (
  props
) => {
  const { active, judge_id, application_id } = props;
  const [updating, setUpdating] = React.useState(false);

  const firestore = useFirestore();

  const handleClick = () => {
    setUpdating(true);
    firestore
      .update(
        { collection: "judges", doc: judge_id },
        { [`assessments.${application_id}.${"status"}`]: nextStatus }
      )
      .then(() => {
        setUpdating(false);
      });
  };

  const nextStatus: AssessmentStatus = active ? "hidden" : "created";

  return (
    <div className="relative">
      {updating && (
        <div className="absolute  -top-6 -left-6 -right-6 -bottom-6 flex justify-center items-center ">
          <Spinner size="2/3"></Spinner>
        </div>
      )}
      <Switch active={active} onClick={handleClick} />
    </div>
  );
};

export default ManageAssessmentStatus;
