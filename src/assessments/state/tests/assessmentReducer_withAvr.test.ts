/**
 * @jest-environment jsdom
 */

import FakeAssessment from "seed/FakeAssessment";
import assessmentReducer from "../assessmentReducer";
import { AssessmentHelper } from "../../helper/AssessmentHelper";

const initialState = {
  data: {},
  ordered: [],
  assessmentCount: 0,
  judgeAverages: {},
  sumByApplicationId: {},
  judgeTypes: {},
};

const getReducer = (
  payload = { ordered: [] as any[] },
  meta = { collection: "judges" }
) => {
  return assessmentReducer(initialState, {
    type: "@@reduxFirestore/LISTENER_RESPONSE",
    payload,
    meta,
  });
};

const testAssessment = (applicationId = 1, judgeId = 1, done = false) => {
  return FakeAssessment(
    `testApplication${applicationId}`,
    `testJudge${judgeId}`,
    done
  );
};

const testAssessmentWithRes = (
  applicationId = 1,
  judgeId = 1,
  done = false
) => {
  const assessment = testAssessment(applicationId, judgeId, done);
  return {
    assessment,
    result: {
      ...assessment,
      sum: AssessmentHelper.sumAssessmentPoints(assessment),
    },
  };
};

const testAssessment1 = testAssessment(1, 1);
const testAssessment2 = testAssessment(2, 2);
const testAssessment3 = testAssessment(3, 3, false);

describe("AssessmentReducer should return Data", () => {
  it("dfg", () => {});
});
