import { get } from "lodash";

interface IJotFormDataMapper {
  [key: string]: string;
}

const jotFormDataMapper: IJotFormDataMapper = {
  id: "id",
  startupName: "answers.3.answer",
  tagLine: "answers.4.answer",
  website: "answers.6.answer",
  foundingDate: "answers.8.answer",
  stage: "answers.9.answer",
  segmentFocus: "answers.10.answer",
  industry: "answers.11.answer",
  headquarters: "answers.12.answer",

  startupOverview: "answers.17.answer",

  problemYouAreSolving: "answers.20.answer",
  productDescription: "answers.21.answer",
  whatMakesYourProductUnique: "answers.22.answer",
  productReadiness: "answers.23.answer",
  productRoadMap: "answers.24.answer",

  targetMarket: "answers.28.answer",
  marketDrivers: "answers.29.answer",
  marketSize: "answers.30.answer",

  competition: "answers.34.answer",
  strengthAgainstCompetitors: "answers.35.answer",
  challengesAgainstCompetitors: "answers.36.answer",

  revenueSources: "answers.39.answer",
  salesStrategy: "answers.40.answer",
  traction: "answers.41.answer",
  pilotsCustomers: "answers.42.answer",
  metrics: "answers.43.answer",

  howIsCompanyFunded: "answers.48.answer",
  amountRaisedToDate: "answers.49.answer",
  yourInvestors: "answers.50.answer",
  fundingObjective: "answers.76.answer",

  numberOfFounders: "answers.54.answer",
  overallTeamSize: "answers.55.answer",
  foundersQualification: "answers.56.answer",

  howImpact: "answers.59.answer",
  whatDegreeSustainability: "answers.60.answer",
  connectionToHamburg: "answers.61.answer",
  collaborateWithEntityHamburg: "answers.62.answer",
  howDidYouHearAboutFHA: "answers.63.answer",

  contactName: "answers.67.prettyFormat",
  contactPosition: "answers.68.answer",
  contactPhoneNumber: "answers.69.prettyFormat",
  contactEmail: "answers.70.answer",

  companyDeck: "answers.73.answer",
  companyLogo: "answers.74.answer",
};

interface IJotFormData {
  [key: string]: any;
}

const parseJotFormData = (jotFormData: IJotFormData) => {
  const res: IJotFormData = {};

  Object.keys(jotFormDataMapper).forEach((element) => {
    const val = get(jotFormData, jotFormDataMapper[element]);

    if (val) {
      res[element] = val;
    }
  });

  return res;
};

export { parseJotFormData };
