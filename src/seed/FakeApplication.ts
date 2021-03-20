import * as faker from "faker";
import {
  IApplicationRecord,
  IMediaItemImage,
  IMediaItemPdf,
} from "applications/ApplicationTypes";
import { base } from "./helper";
import { firebase } from "misc/firebase";

export const FakeApplication: () => IApplicationRecord = () => {
  const application: IApplicationRecord = {
    ...base,
    startupName: faker.company.companyName(),
    tagLine: faker.company.catchPhrase(),
    website: faker.internet.url(),
    foundingDate: firebase.firestore.Timestamp.fromDate(faker.date.past()),
    stage: faker.random.arrayElement(["pre_seed", "seed", "series A", "other"]),
    industry: faker.company.bsAdjective(),
    segmentFocus: faker.random.arrayElement(["B2B", "B2C"]),
    headquarters: faker.address.city(),

    startupOverview: faker.lorem.words(600),

    problemYouAreSolving: faker.lorem.text(300),
    productDescription: faker.lorem.text(300),
    whatMakesYourProductUnique: faker.lorem.text(300),
    productReadiness: faker.lorem.text(300),
    productRoadMap: faker.lorem.words(400),

    targetMarket: [...new Array(faker.random.number({ min: 1, max: 30 }))]
      .fill("a")
      .map(() => faker.address.country()),
    marketDrivers: faker.lorem.text(500),
    marketSize: faker.lorem.text(500),

    competition: faker.lorem.text(500),
    challengesAgainstCompetitors: faker.lorem.text(500),
    strengthAgainstCompetitors: faker.lorem.text(500),

    revenueSources: faker.lorem.text(300),
    salesStrategy: faker.lorem.text(300),
    traction: faker.lorem.text(300),
    metrics: faker.lorem.text(300),
    pilotsCustomers: faker.lorem.text(300),

    howIsCompanyFunded: faker.lorem.text(300),
    amountRaisedToDate: faker.finance.amount(3000, 1000000000),
    yourInvestors: faker.lorem.text(300),
    fundingObjective: faker.finance.amount(3000, 1000000000),

    numberOfFounders: faker.random.number(10).toString(),
    overallTeamSize: faker.random.number(50).toString(),
    foundersQualification: faker.lorem.text(300),

    howImpact: faker.lorem.text(300),
    whatDegreeSustainability: faker.lorem.text(300),
    connectionToHamburg: faker.lorem.text(300),
    collaborateWithEntityHamburg: faker.lorem.text(300),
    howDidYouHearAboutFHA: faker.lorem.word(),

    companyLogo: [...new Array(faker.random.number(1 + 3))]
      .fill("a")
      .map(() => getMediaElement("image")),

    companyDeck: [getMediaElement("pdf")],

    state: "created",
  };

  return application;
};

const getMediaElement = (type: string): IMediaItemImage | IMediaItemPdf => {
  if (type === "image") {
    return { type: "image", src: faker.random.image() };
  }

  return {
    type: "pdf",
    src: faker.image.imageUrl(),
    pdfAsImages: [...new Array(1 + faker.random.number(22))]
      .fill("a")
      .map(() => faker.random.image()),
  };
};
