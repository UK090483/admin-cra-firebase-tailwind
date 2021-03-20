import { IApplicationRecord } from "applications/ApplicationTypes";
import { AssessmentHelper } from "assessments/helper/AssessmentHelper";
import { IAssessmentRecord } from "../../assessments/types";

const getAssessmentStateColor = (assessment: IAssessmentRecord) => {
  const stage = AssessmentHelper.getAssessmentState(assessment);

  return stage === "assigned"
    ? ""
    : stage === "completed"
    ? "bg-green-300 text-white"
    : "bg-yellow-300 text-white";
};

const getApplicationStateColor = (application: any) => {
  return application.applicationState === "assigned"
    ? ""
    : application.applicationState === "completed"
    ? "bg-green-300 text-white"
    : "bg-yellow-300 text-white";
};

// const getApplicationState = (application: IApplicationRecord) => {
//   if (application.assessments) {
//     return AssessmentHelper.getAssessmentState(
//       Object.values(application.assessments)[0]
//     );
//   }
//   return "";
// };

export { getAssessmentStateColor, getApplicationStateColor };
