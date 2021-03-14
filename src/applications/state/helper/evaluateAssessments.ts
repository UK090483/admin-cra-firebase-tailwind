import { IApplicationRecord } from "applications/ApplicationTypes";
import { AssessmentHelper } from "assessments/helper/AssessmentHelper";

const evaluateAssessments = (application: IApplicationRecord) => {
  if (application.assessments) {
    application.assessments = Object.entries(application.assessments).reduce(
      (acc, [key, value]) => {
        const evaluatedAssessment = AssessmentHelper.evaluateAssessment(value);
        return { ...acc, [key]: evaluatedAssessment };
      },
      {}
    );
  }
  return application;
};

export { evaluateAssessments };
