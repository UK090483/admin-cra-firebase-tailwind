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

// export interface IMediaItemImage {
//   type: "image";
//   src: string;
//   // id: string;
// }

export type IMediaItemImage = { type: "image"; src: string };

export type IMediaItemPdf = { type: "pdf"; pdfAsImages: string[]; src: string };

// export interface IMediaItemPdf {
//   type: "pdf";
//   pdfAsImages: string[];
//   src: string;
//   // id: string;
// }

export interface IApplicationTableItem {
  assessments: string[];
  statePre?: ApplicationStatePre;
  stateTree?: ApplicationStatePre;
  id: string;
}

export interface IApplicationRecord extends RecordBase {
  startupName: string;
  tagLine: string;
  website: string;
  foundingDate: string;
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

  companyLogo: (IMediaItemImage | IMediaItemPdf)[];
  companyDeck: (IMediaItemImage | IMediaItemPdf)[];

  // state: string;
  // statePre?: ApplicationStatePre;
  // stateTree?: ApplicationStatePre;
  // sum?: number | undefined;
  // mainSum?: number | undefined;
  // preSum?: number | undefined;
}

export interface IApplicationUpdateAbles {
  statePre?: ApplicationStatePre;
  assessments?: IApplicationAssessment;
}
