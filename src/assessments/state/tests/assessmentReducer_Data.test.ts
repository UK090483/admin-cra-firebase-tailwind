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
  it("should return assessment Data", () => {
    const tAss1 = testAssessmentWithRes(1, 1);
    const tAss2 = testAssessmentWithRes();
    const tAss3 = testAssessmentWithRes();

    expect(
      getReducer({
        ordered: [
          {
            id: "testJudge1",
            judgeType: "pre",
            assessments: {
              testApplication1: tAss1.assessment,
            },
          },
        ],
      }).data
    ).toStrictEqual({
      [tAss1.assessment.application_id]: {
        testJudge1: tAss1.result,
      },
    });
  });

  it("should return assessment Data2", () => {
    expect(
      getReducer({
        ordered: [
          {
            id: "testJudge1",
            judgeType: "pre",
            assessments: {
              testApplication1: testAssessment1,
              testApplication2: testAssessment2,
            },
          },
        ],
      }).data
    ).toStrictEqual({
      [testAssessment1.application_id]: {
        testJudge1: {
          ...testAssessment1,
          sum: AssessmentHelper.sumAssessmentPoints(testAssessment1),
        },
      },
      [testAssessment2.application_id]: {
        testJudge2: {
          ...testAssessment2,
          sum: AssessmentHelper.sumAssessmentPoints(testAssessment2),
        },
      },
    });
  });

  it("should return assessment Data3", () => {
    expect(
      getReducer({
        ordered: [
          {
            id: "testJudge1",
            judgeType: "pre",
            assessments: {
              testApplication1: testAssessment1,
              testApplication2: testAssessment2,
              testApplication3: testAssessment3,
            },
          },
        ],
      }).data
    ).toStrictEqual({
      [testAssessment1.application_id]: {
        testJudge1: {
          ...testAssessment1,
          sum: AssessmentHelper.sumAssessmentPoints(testAssessment1),
        },
      },
      [testAssessment2.application_id]: {
        testJudge2: {
          ...testAssessment2,
          sum: AssessmentHelper.sumAssessmentPoints(testAssessment2),
        },
      },
      [testAssessment3.application_id]: {
        testJudge3: {
          ...testAssessment3,
          sum: AssessmentHelper.sumAssessmentPoints(testAssessment3),
        },
      },
    });
  });

  it("should return assessment Data4", () => {
    expect(
      getReducer({
        ordered: [
          {
            id: "testJudge1",
            judgeType: "pre",
            assessments: {
              testApplication1: testAssessment1,
              testApplication2: testAssessment2,
              testApplication3: testAssessment3,
            },
          },
          {
            id: "testJudge2",
            judgeType: "pre",
            assessments: {
              testApplication1: testAssessment1,
              testApplication2: testAssessment2,
              testApplication3: testAssessment3,
            },
          },
        ],
      }).data
    ).toStrictEqual({
      [testAssessment1.application_id]: {
        testJudge1: {
          ...testAssessment1,
          sum: AssessmentHelper.sumAssessmentPoints(testAssessment1),
        },
      },
      [testAssessment2.application_id]: {
        testJudge2: {
          ...testAssessment2,
          sum: AssessmentHelper.sumAssessmentPoints(testAssessment2),
        },
      },
      [testAssessment3.application_id]: {
        testJudge3: {
          ...testAssessment3,
          sum: AssessmentHelper.sumAssessmentPoints(testAssessment3),
        },
      },
    });
  });
});
