import { IApplicationRecord } from "applications/ApplicationTypes";
import { IApplicationState } from "../applicationsReducer";

export const getAssessmentsById = (
  application: IApplicationRecord,
  state: IApplicationState
) => {
  // console.time("getAssessmentsById");
  if (application.assessments) {
    Object.entries(application.assessments).forEach(([judgeId, assessment]) => {
      if (!state.assessmentsByJudgeId[judgeId]) {
        state.assessmentsByJudgeId[judgeId] = {};
      }
      state.assessmentsByJudgeId[judgeId][assessment.application_id] = {
        ...assessment,
        id: judgeId + assessment.application_id,
        application_name: application.startupName,
      };
    });
  }
  // console.timeEnd("getAssessmentsById");
};
