/**
 * @jest-environment jsdom
 */

import FakeAssessment from "seed/FakeAssessment";
import assessmentReducer, { IAssessmentState } from "../assessmentReducer";
import { AssessmentHelper } from "../../helper/AssessmentHelper";

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

const InitA1 = testAssessmentWithRes(1, 1);
const InitA2 = testAssessmentWithRes(2, 1);
const InitA3 = testAssessmentWithRes(2, 2);

const initialStateFull = {
  data: {
    [InitA1.assessment.application_id]: {
      [InitA1.assessment.judge_id]: InitA1.result,
    },
    [InitA2.assessment.application_id]: {
      [InitA2.assessment.judge_id]: InitA2.result,
      [InitA3.assessment.judge_id]: InitA3.result,
    },
  },
  ordered: [],
  assessmentCount: 0,
  judgeAverages: {},
  sumByApplicationId: {
    [InitA1.assessment.application_id]: {
      main: -1,
      all: InitA1.result.sum ? InitA1.result.sum : -1,
      pre: InitA1.result.sum ? InitA1.result.sum : -1,
    },
    [InitA2.assessment.application_id]: {
      main: -1,
      all:
        InitA2.result.sum &&
        InitA3.result.sum &&
        (InitA2.result.sum + InitA3.result.sum) / 2,
      pre:
        InitA2.result.sum &&
        InitA3.result.sum &&
        (InitA2.result.sum + InitA3.result.sum) / 2,
    },
  },
  judgeTypes: {
    [InitA1.assessment.judge_id]: "pre",
    [InitA2.assessment.judge_id]: "pre",
    [InitA3.assessment.judge_id]: "pre",
  },
};

const initialState = {
  data: {},
  ordered: [],
  assessmentCount: 0,
  judgeAverages: {},
  sumByApplicationId: {},
  judgeTypes: {},
};

const getTestReducer = (payload = { data: {} }, state = initialState) => {
  return assessmentReducer(state, {
    type: "@@reduxFirestore/DOCUMENT_MODIFIED",
    payload,
    meta: { collection: "judges" },
  });
};

describe("AssessmentReducer ListenerResponse", () => {
  it("should return Inital State", () => {
    expect(getTestReducer()).toStrictEqual(initialState);
  });

  it("should add Assessment to State", () => {
    const tA1 = testAssessmentWithRes();
    expect(
      getTestReducer({
        data: {
          assessments: {
            FakeAssessment1: tA1.assessment,
          },
        },
      }).data
    ).toStrictEqual({
      [tA1.assessment.application_id]: {
        [tA1.assessment.judge_id]: tA1.result,
      },
    });
  });

  it("should overwrite Assessment if existed", () => {
    const tA1 = testAssessmentWithRes();
    expect(
      getTestReducer(
        {
          data: {
            assessments: {
              FakeAssessment1: tA1.assessment,
            },
          },
        },
        initialStateFull
      ).data
    ).toStrictEqual({
      ...initialStateFull.data,
      [tA1.assessment.application_id]: {
        [tA1.assessment.judge_id]: tA1.result,
      },
    });
  });

  it("should overwrite sumByApplicationId", () => {
    const tA1 = testAssessmentWithRes();
    expect(
      getTestReducer(
        {
          data: {
            assessments: {
              FakeAssessment1: tA1.assessment,
            },
          },
        },
        initialStateFull
      ).sumByApplicationId
    ).toStrictEqual({
      ...initialStateFull.sumByApplicationId,
      [tA1.assessment.application_id]: {
        all: tA1.result.sum,
        main: -1,
        pre: tA1.result.sum,
      },
    });
  });
});
