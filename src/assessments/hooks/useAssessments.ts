import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "redux/Reducers/RootReducer";

export default function useAssessments() {
  const {
    AssessmentsByApplicationId,
    sumByApplicationId,
    judgeAverages,
    sumWithJudgeAverages,
  } = useSelector(
    (state: RootState) => ({
      AssessmentsByApplicationId: state.assessments.data,
      sumByApplicationId: state.assessments.sumByApplicationId,
      judgeAverages: state.assessments.judgeAverages,
      sumWithJudgeAverages: state.assessments.withJudgeAvr || {},
    }),
    shallowEqual
  );

  return {
    judgeAverages,
    AssessmentsByApplicationId,
    sumByApplicationId,
    sumWithJudgeAverages,
  };
}
