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

  if (done) {
    delete assessment.isClearUSP;
  }

  return {
    assessment,
    result: {
      ...assessment,
      sum: AssessmentHelper.sumAssessmentPoints(assessment),
    },
  };
};

describe("AssessmentReducer should return sumByApplicationId", () => {
  it("1 judge 1 assessment", () => {
    const tAss1 = testAssessmentWithRes(1, 1);

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
      }).sumByApplicationId
    ).toStrictEqual({
      [tAss1.assessment.application_id]: {
        all: tAss1.result.sum,
        main: -1,
        pre: tAss1.result.sum,
      },
    });
  });

  it("1 judge 2 assessments", () => {
    const tAss1 = testAssessmentWithRes(1, 1);
    const tAss2 = testAssessmentWithRes(2, 1);

    expect(
      getReducer({
        ordered: [
          {
            id: "testJudge1",
            judgeType: "pre",
            assessments: {
              testApplication1: tAss1.assessment,
              testApplication2: tAss2.assessment,
            },
          },
        ],
      }).sumByApplicationId
    ).toStrictEqual({
      [tAss1.assessment.application_id]: {
        all: tAss1.result.sum,
        main: -1,
        pre: tAss1.result.sum,
      },
      [tAss2.assessment.application_id]: {
        all: tAss2.result.sum,
        main: -1,
        pre: tAss2.result.sum,
      },
    });
  });

  it("1 Judge 3 assessments(one unfinished)", () => {
    const tAss1 = testAssessmentWithRes(1, 1);
    const tAss2 = testAssessmentWithRes(2, 1);
    const tAss3 = testAssessmentWithRes(3, 1, true);

    expect(
      getReducer({
        ordered: [
          {
            id: "testJudge1",
            judgeType: "pre",
            assessments: {
              testApplication1: tAss1.assessment,
              testApplication2: tAss2.assessment,
              testApplication3: tAss3.assessment,
            },
          },
        ],
      }).sumByApplicationId
    ).toStrictEqual({
      [tAss1.assessment.application_id]: {
        all: tAss1.result.sum,
        main: -1,
        pre: tAss1.result.sum,
      },
      [tAss2.assessment.application_id]: {
        all: tAss2.result.sum,
        main: -1,
        pre: tAss2.result.sum,
      },
      [tAss3.assessment.application_id]: {
        all: -1,
        main: -1,
        pre: -1,
      },
    });
  });

  it("2 judges 3 assessments ", () => {
    const tAss1 = testAssessmentWithRes(1, 1);
    const tAss2 = testAssessmentWithRes(2, 1);
    const tAss3 = testAssessmentWithRes(3, 1, true);

    const tAss1b = testAssessmentWithRes(1, 2);
    const tAss2b = testAssessmentWithRes(2, 2);
    const tAss3b = testAssessmentWithRes(3, 2, true);

    const expectA1 = {
      all:
        tAss1.result.sum &&
        tAss1b.result.sum &&
        (tAss1.result.sum + tAss1b.result.sum) / 2,
      main: -1,
      pre:
        tAss1.result.sum &&
        tAss1b.result.sum &&
        (tAss1.result.sum + tAss1b.result.sum) / 2,
    };
    const expectA2 = {
      all:
        tAss2.result.sum &&
        tAss2b.result.sum &&
        (tAss2.result.sum + tAss2b.result.sum) / 2,
      main: -1,
      pre:
        tAss2.result.sum &&
        tAss2b.result.sum &&
        (tAss2.result.sum + tAss2b.result.sum) / 2,
    };

    expect(
      getReducer({
        ordered: [
          {
            id: "testJudge1",
            judgeType: "pre",
            assessments: {
              testApplication1: tAss1.assessment,
              testApplication2: tAss2.assessment,
              testApplication3: tAss3.assessment,
            },
          },
          {
            id: "testJudge2",
            judgeType: "pre",
            assessments: {
              testApplication1: tAss1b.assessment,
              testApplication2: tAss2b.assessment,
              testApplication3: tAss3b.assessment,
            },
          },
        ],
      }).sumByApplicationId
    ).toStrictEqual({
      [tAss1.assessment.application_id]: expectA1,
      [tAss2.assessment.application_id]: expectA2,
      [tAss3.assessment.application_id]: {
        all: -1,
        main: -1,
        pre: -1,
      },
    });
  });

  it("should not add unfinished assessments", () => {
    const tAss1 = testAssessmentWithRes(1, 1);
    const tAss2 = testAssessmentWithRes(2, 1, true);
    const tAss3 = testAssessmentWithRes(3, 1, true);

    const tAss1b = testAssessmentWithRes(1, 2, true);
    const tAss2b = testAssessmentWithRes(2, 2);
    const tAss3b = testAssessmentWithRes(3, 2, true);

    const expectA1 = {
      all: tAss1.result.sum,
      pre: tAss1.result.sum,
      main: -1,
    };
    const expectA2 = {
      all: tAss2b.result.sum,
      pre: tAss2b.result.sum,
      main: -1,
    };
    expect(
      getReducer({
        ordered: [
          {
            id: "testJudge1",
            judgeType: "pre",
            assessments: {
              testApplication1: tAss1.assessment,
              testApplication2: tAss2.assessment,
              testApplication3: tAss3.assessment,
            },
          },
          {
            id: "testJudge2",
            judgeType: "pre",
            assessments: {
              testApplication1: tAss1b.assessment,
              testApplication2: tAss2b.assessment,
              testApplication3: tAss3b.assessment,
            },
          },
        ],
      }).sumByApplicationId
    ).toStrictEqual({
      [tAss1.assessment.application_id]: expectA1,
      [tAss2.assessment.application_id]: expectA2,
      [tAss3.assessment.application_id]: {
        all: -1,
        main: -1,
        pre: -1,
      },
    });
  });
});
