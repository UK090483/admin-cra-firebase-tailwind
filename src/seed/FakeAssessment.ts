import * as faker from "faker";
import { IAssessmentRecord } from "assessments/types";
import { base } from "./helper";

const pointGenerator = () => {
  let sum = 0;
  const ran: (1 | 2 | 3 | 4)[] = [1, 2, 3, 4];
  return {
    point: (): 1 | 2 | 3 | 4 => {
      const ranPoint = ran[Math.floor(Math.random() * ran.length)];
      sum += ranPoint;
      return ranPoint;
    },
    sum: () => sum,
  };
};

const FakeAssessment: (
  application_id: string,
  judge_id: string,
  mock_in_process?: boolean
) => IAssessmentRecord = (
  application_id,
  judge_id,
  mock_in_process = false
) => {
  const { point } = pointGenerator();

  return {
    ...base,
    application_id: application_id,
    application_name: "",
    judge_id: judge_id,
    judge_name: "",
    ...((faker.random.boolean() || !mock_in_process) && {
      isInnovative: point(),
    }),
    isInnovativeReason: faker.lorem.paragraph(3),

    ...((faker.random.boolean() || !mock_in_process) && {
      isClearUSP: point(),
    }),
    isClearUSPReason: faker.lorem.paragraph(3),
    ...((faker.random.boolean() || !mock_in_process) && {
      isTherePotential: point(),
    }),
    isTherePotentialReason: faker.lorem.paragraph(3),
    doTheyKnowCompetitors: point(),
    doTheyKnowCompetitorsReason: faker.lorem.paragraph(3),
    isBusinessModelSolid: point(),
    isBusinessModelSolidReason: faker.lorem.paragraph(3),
    areNumbersPromising: point(),
    areNumbersPromisingReason: faker.lorem.paragraph(3),
    isFundingSolid: point(),
    isFundingSolidReason: faker.lorem.paragraph(3),
    isTeamExperienced: point(),
    isTeamExperiencedReason: faker.lorem.paragraph(3),
    willFutureCitiesBenefit: point(),
    willFutureCitiesBenefitReason: faker.lorem.paragraph(3),
    isComplianceWithSDG: point(),
    isComplianceWithSDGReason: faker.lorem.paragraph(3),
    isPresentationGood: point(),
    isPresentationGoodReason: faker.lorem.paragraph(3),
    status: "created",
  };
};

export default FakeAssessment;
