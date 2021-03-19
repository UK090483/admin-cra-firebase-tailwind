/**
 * @jest-environment jsdom
 */

import FakeAssessment from "seed/FakeAssessment";
import assessmentReducer from "./assessmentReducer";
import { AssessmentHelper } from "../helper/AssessmentHelper";
import { IAssessmentRecord } from "../types";

const initialState = {
  data: {},
  ordered: [],
  assessmentCount: 0,
  judgeAverages: {},
  sumByApplicationId: {},
  judgeTypes: {},
};

const testAssessment = () => {
  return FakeAssessment("testApplication1", "testJudge1");
};

const ordered = [{}, {}, {}];

describe("AssessmentReducer", () => {
  it("should return Initial State", () => {
    expect(assessmentReducer(undefined, { type: "noType" })).toMatchSnapshot();
  });

  it("should return Initial State 2", () => {
    expect(
      assessmentReducer(initialState, {
        type: "@@reduxFirestore/LISTENER_RESPONSE",
        payload: { ordered: {} },
        meta: { collection: "bla" },
      })
    ).toMatchSnapshot();
  });

  it("should return correct  assessmentCount", () => {
    expect(
      assessmentReducer(initialState, {
        type: "@@reduxFirestore/LISTENER_RESPONSE",
        payload: { ordered: {} },
        meta: { collection: "judges" },
      }).assessmentCount
    ).toBe(0);

    expect(
      assessmentReducer(initialState, {
        type: "@@reduxFirestore/LISTENER_RESPONSE",
        payload: { ordered: [{}, {}, {}] },
        meta: { collection: "judges" },
      }).assessmentCount
    ).toBe(0);

    expect(
      assessmentReducer(initialState, {
        type: "@@reduxFirestore/LISTENER_RESPONSE",
        payload: { ordered: [{ assessments: {} }, {}, {}] },
        meta: { collection: "judges" },
      }).assessmentCount
    ).toBe(0);

    expect(
      assessmentReducer(initialState, {
        type: "@@reduxFirestore/LISTENER_RESPONSE",
        payload: {
          ordered: [
            { judgeType: "pre", assessments: { testAssessment1: {} } },
            {},
            {},
          ],
        },
        meta: { collection: "judges" },
      }).assessmentCount
    ).toBe(1);

    expect(
      assessmentReducer(initialState, {
        type: "@@reduxFirestore/LISTENER_RESPONSE",
        payload: {
          ordered: [
            { judgeType: "pre", assessments: { testAssessment1: {} } },
            { judgeType: "pre", assessments: { testAssessment2: {} } },
            {},
          ],
        },
        meta: { collection: "judges" },
      }).assessmentCount
    ).toBe(2);
  });

  it("should return judge Averages", () => {
    expect(
      assessmentReducer(initialState, {
        type: "@@reduxFirestore/LISTENER_RESPONSE",
        payload: { ordered: [] },
        meta: { collection: "judges" },
      }).judgeAverages
    ).toStrictEqual({});

    const testAssessment1 = { ...testAssessment() };
    const testAssessment2 = { ...testAssessment() };
    const testAssessment3 = { ...testAssessment() };
    delete testAssessment3.isBusinessModelSolid;

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

    expect(
      assessmentReducer(initialState, {
        type: "@@reduxFirestore/LISTENER_RESPONSE",
        payload: {
          ordered: [
            {
              id: "testJudge1",
              judgeType: "pre",
              assessments: {
                testAssessment2: { ...testAssessment1 },
              },
            },
          ],
        },
        meta: { collection: "judges" },
      }).judgeAverages
    ).toStrictEqual({
      testJudge1: sumTestAssessment1,
    });

    expect(
      assessmentReducer(initialState, {
        type: "@@reduxFirestore/LISTENER_RESPONSE",
        payload: {
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
        },
        meta: { collection: "judges" },
      }).judgeAverages
    ).toStrictEqual({
      testJudge1: expectedAvr,
    });

    expect(
      assessmentReducer(initialState, {
        type: "@@reduxFirestore/LISTENER_RESPONSE",
        payload: {
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
        },
        meta: { collection: "judges" },
      }).judgeAverages
    ).toStrictEqual({
      testJudge1: expectedAvr,
    });
  });

  it("should return assessment Data", () => {});
});
