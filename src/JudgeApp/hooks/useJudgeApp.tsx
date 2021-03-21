import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const useJudgeApp = () => {
  const { assessments, allDone, checkedOut, showPanel } = useSelector(
    (state: RootState) => ({
      assessments: state.fb.profile.assessments,
      allDone: state.judgeApp.allDone,
      checkedOut: state.fb.profile.state === "done",
      showPanel: state.fb.profile.state === "done" || state.judgeApp.allDone,
    })
  );

  const getAssessment = (id: string) => {
    return assessments && assessments[id];
  };

  return { getAssessment, allDone, checkedOut, showPanel };
};

export { useJudgeApp };
