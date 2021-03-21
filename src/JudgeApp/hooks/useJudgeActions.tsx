import { judgeState } from "judges/JudgeTypes";
import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { RootState } from "redux/Reducers/RootReducer";
import { useJudgeApp } from "./useJudgeApp";

const useJudgeActions = () => {
  const firestore = useFirestore();
  const { judge_id } = useSelector((state: RootState) => ({
    judge_id: state.fb.auth.uid,
  }));

  const { checkedOut } = useJudgeApp();

  const checkOut = async () => {
    type CheckoutAction = { state: judgeState };
    const nextState: CheckoutAction = { state: "done" };
    await firestore.update({ collection: "judges", doc: judge_id }, nextState);

    return true;
  };

  type updateAssessmentProps = {
    data: { [k: string]: string | number };
    application_id: string;
  };

  const updateAssessment = async (props: updateAssessmentProps) => {
    const { data, application_id } = props;
    if (checkedOut) return;
    await firestore.update(
      { collection: "judges", doc: judge_id },
      {
        ...Object.entries(data).reduce(
          (acc, [key, value]) => ({
            ...acc,
            [`assessments.${application_id}.${key}`]: value,
          }),
          {}
        ),
        [`assessments.${application_id}.judge_id`]: judge_id,
        [`assessments.${application_id}.application_id`]: application_id,
      }
    );
    return true;
  };

  return { checkOut, updateAssessment };
};

export { useJudgeActions };
