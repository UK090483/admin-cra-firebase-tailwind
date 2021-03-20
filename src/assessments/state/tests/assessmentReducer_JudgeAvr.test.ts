/**
 * @jest-environment jsdom
 */

import FakeAssessment from "seed/FakeAssessment";
import assessmentReducer from "../assessmentReducer";
import { AssessmentHelper } from "../../helper/AssessmentHelper";
import { IAssessmentRecord } from "../../types";
import { result } from "underscore";

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
  const assessment = FakeAssessment(
    `testApplication${applicationId}`,
    `testJudge${judgeId}`,
    done
  );

  if (done) {
    delete assessment.isClearUSP;
  }
  return assessment;
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
const testAssessment3 = testAssessment(3, 3, true);

const sumTestAssessment1 = AssessmentHelper.sumAssessmentPoints(
  testAssessment1
);
const sumTestAssessment2 = AssessmentHelper.sumAssessmentPoints(
  testAssessment2
);

const expectedAvr =
  sumTestAssessment1 &&
  sumTestAssessment2 &&
  (sumTestAssessment1 + sumTestAssessment2) / 2;

describe("AssessmentReducer should return judge Averages", () => {
  it("but nothing with no data", () => {
    expect(getReducer().judgeAverages).toStrictEqual({});
  });

  it("1 judge 1 assessment", () => {
    expect(
      getReducer({
        ordered: [
          {
            id: "testJudge1",
            judgeType: "pre",
            assessments: {
              testAssessment2: { ...testAssessment1 },
            },
          },
        ],
      }).judgeAverages
    ).toStrictEqual({
      testJudge1: sumTestAssessment1,
    });
  });

  it("one Judge 2 assessments", () => {
    expect(
      getReducer({
        ordered: [
          {
            id: "testJudge1",
            judgeType: "pre",
            assessments: {
              testAssessment1: { ...testAssessment1 },
              testAssessment2: { ...testAssessment2 },
            },
          },
        ],
      }).judgeAverages
    ).toStrictEqual({
      testJudge1: expectedAvr,
    });
  });

  it("1 judge 2 assessments (one assessment not ready)", () => {
    expect(
      getReducer({
        ordered: [
          {
            id: "testJudge1",
            judgeType: "pre",
            assessments: {
              testAssessment1: { ...testAssessment1 },
              testAssessment2: { ...testAssessment2 },
              testAssessment3: { ...testAssessment3 },
            },
          },
        ],
      }).judgeAverages
    ).toStrictEqual({
      testJudge1: expectedAvr,
    });
  });
});
