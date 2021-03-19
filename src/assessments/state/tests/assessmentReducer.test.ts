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

const getTestReducer = (
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

describe("AssessmentReducer", () => {
  it("should return Initial State", () => {
    expect(assessmentReducer(undefined, { type: "noType" })).toMatchSnapshot();
  });

  it("should return Initial State 2", () => {
    expect(getTestReducer()).toMatchSnapshot();
  });

  it("should return correct  assessmentCount", () => {
    expect(getTestReducer().assessmentCount).toBe(0);
    expect(getTestReducer({ ordered: [{}, {}, {}] }).assessmentCount).toBe(0);
    expect(
      getTestReducer({ ordered: [{ assessments: {} }, {}, {}] }).assessmentCount
    ).toBe(0);
    expect(
      getTestReducer({
        ordered: [
          { judgeType: "pre", assessments: { testAssessment1: {} } },
          {},
          {},
        ],
      }).assessmentCount
    ).toBe(1);

    expect(
      getTestReducer({
        ordered: [
          { judgeType: "pre", assessments: { testAssessment1: {} } },
          { judgeType: "pre", assessments: { testAssessment2: {} } },
          {},
        ],
      }).assessmentCount
    ).toBe(2);
  });
});
