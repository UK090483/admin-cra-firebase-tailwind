import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "redux/Reducers/RootReducer";

export default function useAssessments() {
  const {
    AssessmentsByApplicationId,
    sumByApplicationId,
    judgeAverages,
  } = useSelector(
    (state: RootState) => ({
      AssessmentsByApplicationId: state.assessments.data,
      sumByApplicationId: state.assessments.sumByApplicationId,
      judgeAverages: state.assessments.judgeAverages,
    }),
    shallowEqual
  );

  return {
    judgeAverages,
    AssessmentsByApplicationId,
    sumByApplicationId,
  };
}
