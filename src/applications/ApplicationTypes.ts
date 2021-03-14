import { IAssessmentRecord } from "assessments/types";
import { FirebaseTimestamp, RecordBase } from "../types";

export type ApplicationStatePre =
  | "accepted"
  | "declined"
  | "postponed"
  | "allocated";

export interface IApplicationAssessment {
  [id: string]: IAssessmentRecord;
}

export interface IApplicationRecord extends RecordBase {
  startupName: string;
  tagLine: string;
  website: string;
  foundingDate: FirebaseTimestamp;
  stage: string;
  industry: string;
  segmentFocus: string;
  headquarters: string;
  startupOverview: string;
  problemYouAreSolving: string;
  whatMakesYourProductUnique: string;
  productDescription: string;
  productReadiness: string;
  productRoadMap: string;
  targetMarket: string[];
  marketDrivers: string;
  marketSize: string;
  competition: string;
  strengthAgainstCompetitors: string;
  challengesAgainstCompetitors: string;
  revenueSources: string;
  salesStrategy: string;
  traction: string;
  pilotsCustomers: string;
  metrics: string;
  howIsCompanyFunded: string;
  amountRaisedToDate: string;
  yourInvestors: string;
  fundingObjective: string;
  numberOfFounders: string;
  overallTeamSize: string;
  foundersQualification: string;
  howImpact: string;
  whatDegreeSustainability: string;
  connectionToHamburg: string;
  collaborateWithEntityHamburg: string;
  howDidYouHearAboutFHA: string;

  companyLogo: any;
  companyDeck: any;

  state: string;
  statePre?: ApplicationStatePre;
  stateTree?: ApplicationStatePre;
  sum?: number | undefined;
  mainSum?: number | undefined;
  preSum?: number | undefined;
  assessments?: IApplicationAssessment;
}

export interface IApplicationUpdateAbles {
  statePre?: ApplicationStatePre;
  assessments?: IApplicationAssessment;
}
