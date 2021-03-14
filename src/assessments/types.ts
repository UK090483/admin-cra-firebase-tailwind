import { Record, Identifier } from "../types";
export type AssessmentRating = 1 | 2 | 3 | 4;

export type AssessmentStatus = "created" | "hidden";

export interface IAssessmentPoints {
  isInnovative?: AssessmentRating;
  isClearUSP?: AssessmentRating;
  isTherePotential?: AssessmentRating;
  doTheyKnowCompetitors?: AssessmentRating;
  isBusinessModelSolid?: AssessmentRating;
  areNumbersPromising?: AssessmentRating;
  isFundingSolid?: AssessmentRating;
  isTeamExperienced?: AssessmentRating;
  willFutureCitiesBenefit?: AssessmentRating;
  isComplianceWithSDG?: AssessmentRating;
  isPresentationGood?: AssessmentRating;
}

export interface IAssessmentRecord extends Record, IAssessmentPoints {
  application_id: Identifier;
  application_name: string;
  judge_id: Identifier;
  judge_name: string;
  isInnovativeReason?: string;
  isClearUSPReason?: string;
  isTherePotentialReason?: string;
  doTheyKnowCompetitorsReason?: string;
  isBusinessModelSolidReason?: string;
  areNumbersPromisingReason?: string;
  isFundingSolidReason?: string;
  isTeamExperiencedReason?: string;
  willFutureCitiesBenefitReason?: string;
  isComplianceWithSDGReason?: string;
  isPresentationGoodReason?: string;
  status: AssessmentStatus;
  sum?: number;
}
