import { AssessmentHelper } from "../../../assessments/helper/AssessmentHelper";
import { IApplicationState } from "../applicationsReducer";

export const getJudgeAverages = (state: IApplicationState) => {
  Object.entries(state.assessmentsByJudgeId).forEach(
    ([judgeId, assessments]) => {
      let avrList = Object.values(assessments).reduce((acc, assessment) => {
        const assAvr = AssessmentHelper.getAvarage(assessment);
        if (assAvr) {
          acc.push(assAvr);
        }
        return acc;
      }, [] as number[]);

      if (avrList.length > 0) {
        state.judgeAverages[judgeId] =
          avrList.reduce((acc, item) => acc + item) / avrList.length;
      }
    }
  );
};
