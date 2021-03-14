import { IAssessmentRecord } from "assessments/types";
import FakeAssessment from "seed/FakeAssessment";
import { AssessmentHelper } from "./AssessmentHelper";

const fakeAssessmentNumbers = {
  isInnovative: 3, //*3
  isClearUSP: 4,
  isTherePotential: 4,
  doTheyKnowCompetitors: 1,
  areNumbersPromising: 4,
  isFundingSolid: 4,
  isTeamExperienced: 3,
  willFutureCitiesBenefit: 1, //*3
  isComplianceWithSDG: 2,
  isPresentationGood: 2, //*2
  isBusinessModelSolid: 2,
};

const expResult = 3 * 3 + 4 + 4 + 1 + 4 + 4 + 3 + 3 + 2 + 4 + 2;

describe("AssessmentHelper", () => {
  test("getQuestions should be 11", () => {
    expect(AssessmentHelper.getQuestions()).toHaveLength(11);
  });
  test("getTableFields should be 11", () => {
    expect(AssessmentHelper.getTableFields()).toHaveLength(11);
  });
  test("sumAssessmentPoints should work as expected", () => {
    const fakeAssessment1 = FakeAssessment("a", "b");
    delete fakeAssessment1.isBusinessModelSolid;
    expect(AssessmentHelper.sumAssessmentPoints(fakeAssessment1)).toBeUndefined;
    expect(
      AssessmentHelper.evaluateAssessment(fakeAssessment1)
    ).not.toHaveProperty("sum");
    const fakeAssessment2 = {
      ...FakeAssessment("a", "b"),
      ...fakeAssessmentNumbers,
    } as IAssessmentRecord;
    expect(AssessmentHelper.sumAssessmentPoints(fakeAssessment2)).toBe(
      expResult
    );
    expect(AssessmentHelper.evaluateAssessment(fakeAssessment2)).toHaveProperty(
      "sum"
    );
    expect(AssessmentHelper.evaluateAssessment(fakeAssessment2).sum).toBe(
      expResult
    );
  });
  test("getAssessmentState", () => {
    const fakeAssessment1 = FakeAssessment("a", "b");
    expect(AssessmentHelper.getAssessmentState(fakeAssessment1)).toBe(
      "completed"
    );
    const fakeAssessment2 = FakeAssessment("a", "b");
    delete fakeAssessment2.isBusinessModelSolid;
    expect(AssessmentHelper.getAssessmentState(fakeAssessment2)).toBe(
      "processed"
    );
    const fakeAssessment3 = FakeAssessment("a", "b");
    Object.keys(fakeAssessmentNumbers).forEach((key) => {
      // @ts-ignore
      delete fakeAssessment3[key];
    });
    expect(AssessmentHelper.getAssessmentState(fakeAssessment3)).toBe(
      "assigned"
    );
  });
});
