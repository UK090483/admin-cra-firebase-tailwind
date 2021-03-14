import { IAssessmentRecord } from "assessments/types";
import { jotFormDataMaper } from "exampleJotform";
import { get } from "lodash";
// import { AssessmentTypeKey } from "./assessmentType";
import Application from "../../judges/views/Judge";
import TextInput from "../../components/Form/FormInputs/TextInput";
import ListInput from "../../components/Form/FormInputs/ListInput";

type Key = keyof ApplicationType;

type AssessmentTypeKey = keyof IAssessmentRecord;

interface ApplicationField {
  label: string;
  type: string;

  input?: JSX.Element;
}

interface ApplicationFields {
  [key: string]: ApplicationField;
}

interface ApplicationTopic {
  fields: ApplicationFields;

  assessments?: AssessmentTypeKey[];
}

interface ApplicationType {
  [propName: string]: ApplicationTopic;
}

interface GetAllFieldsResult {
  [propName: string]: ApplicationField;
}

export interface Application extends ApplicationType {}

class ApplicationC {
  applicaton: ApplicationType;

  constructor(a: ApplicationType) {
    this.applicaton = a;
  }

  getTopics(): string[] {
    return Object.keys(this.applicaton).map((key) => key);
  }

  getFields(
    topic: keyof ApplicationType
  ): { key: string; field: ApplicationField }[] {
    return Object.keys(this.applicaton[topic].fields).map((key) => {
      return { key, field: this.applicaton[topic].fields[key] };
    });
  }

  getAllFields(): GetAllFieldsResult {
    const res: any = {};

    Object.keys(this.applicaton).forEach((key) => {
      Object.keys(this.applicaton[key].fields).forEach((element) => {
        res[element] = this.applicaton[key].fields[element];
      });
    });

    return res;
  }

  getAssessments(
    topic: keyof ApplicationType
  ): AssessmentTypeKey[] | undefined {
    return this.applicaton[topic].assessments;
  }

  parseJotFormData(jotformData: IJotFormData) {
    const res: IJotFormData = {};
    Object.keys(this.applicaton).forEach((key) => {
      Object.keys(this.applicaton[key].fields).forEach((element) => {
        if (jotFormDataMaper[element]) {
          res[element] = get(jotformData, jotFormDataMaper[element]);
        } else {
          res[element] = "not found";
        }
      });
    });

    Object.keys(jotFormDataMaper).forEach((element) => {
      res[element] = get(jotformData, jotFormDataMaper[element]);
    });

    return res;
  }
}

interface IJotFormToApplication {
  [key: string]: string;
}
interface IJotFormData {
  [key: string]: any;
}

const ApplicationObject: ApplicationType = {
  BasicInformation: {
    fields: {
      startupName: {
        label: "Startup Name",
        type: "text",
        input: <TextInput label={"Startup Name"} name={"startupName"} />,
      },
      tagLine: {
        label: "Tag Line",
        type: "text",
        input: <TextInput label={"Tag Line"} name={"tagLine"} />,
      },
      website: {
        label: "Website",
        type: "url",
        input: <TextInput label={"Website"} name={"website"} />,
      },
      foundingDate: {
        label: "Founding date",
        type: "text",
        input: <TextInput label={"Founding date"} name={"foundingDate"} />,
      },
      stage: {
        label: "Stage",
        type: "text",
        input: <TextInput label={"Stage"} name={"stage"} />,
      },
      segmentFocus: {
        label: "Segment focus",
        type: "text",
        input: <TextInput label={"Segment focus"} name={"segmentFocus"} />,
      },
      industry: {
        label: "Industry",
        type: "text",
        input: <TextInput label={"Industry"} name={"industry"} />,
      },
      headquarters: {
        label: "Headquarters",
        type: "text",
        input: <TextInput label={"Headquarters"} name={"headquarters"} />,
      },
    },
  },
  StartupOverview: {
    fields: {
      startupOverview: {
        label: "startup Overview",
        type: "text",
        input: (
          <TextInput
            label={"startup Overview"}
            name={"startupOverview"}
            textarea
          />
        ),
      },
    },
  },
  Product: {
    fields: {
      problemYouAreSolving: {
        label: "Problem you are solving & severity of the problem",
        type: "text",
        input: (
          <TextInput
            label={"Problem you are solving & severity of the problem"}
            name={"problemYouAreSolving"}
            textarea
          />
        ),
      },
      productDescription: {
        label: "Product description",
        type: "text",
        input: (
          <TextInput
            label={"Product description"}
            name={"productDescription"}
            textarea
          />
        ),
      },
      whatMakesYourProductUnique: {
        label: "What makes your service/product special and unique?",
        type: "text",
        input: (
          <TextInput
            label={"What makes your service/product special and unique?"}
            name={"whatMakesYourProductUnique"}
            textarea
          />
        ),
      },
      productReadiness: {
        label: "Product readiness & where are you now",
        type: "text",
        input: (
          <TextInput
            label={"Product readiness & where are you now"}
            name={"productReadiness"}
            textarea
          />
        ),
      },
      productRoadMap: {
        label: "Product Road Map",
        type: "text",
        input: (
          <TextInput
            label={"Product Road Map"}
            name={"productRoadMap"}
            textarea
          />
        ),
      },
    },
    assessments: ["isInnovative", "isClearUSP"],
  },
  Market: {
    fields: {
      targetMarket: {
        label: "Target Market",
        type: "list",
        input: <ListInput label={"Target Market"} name={"targetMarket"} />,
      },
      marketDrivers: {
        label: "Market Drivers & challenges",
        type: "text",
        input: (
          <TextInput
            label={"Market Drivers & challenges"}
            name={"marketDrivers"}
            textarea
          />
        ),
      },
      marketSize: {
        label: "Market Size",
        type: "text",
        input: <TextInput label={"Market Size"} name={"marketSize"} textarea />,
      },
    },

    assessments: ["isTherePotential"],
  },
  Competition: {
    fields: {
      competition: {
        label: "Competition",
        type: "text",
        input: (
          <TextInput label={"Competition"} name={"competition"} textarea />
        ),
      },
      strengthAgainstCompetitors: {
        label: "Strength against competitors",
        type: "text",
        input: (
          <TextInput
            label={"Strength against competitors"}
            name={"strengthAgainstCompetitors"}
            textarea
          />
        ),
      },
      challengesAgainstCompetitors: {
        label: "Challenges against competitors",
        type: "text",
        input: (
          <TextInput
            label={"Challenges against competitors"}
            name={"challengesAgainstCompetitors"}
            textarea
          />
        ),
      },
    },

    assessments: ["doTheyKnowCompetitors"],
  },
  Business: {
    fields: {
      revenueSources: {
        label: "Revenue sources",
        type: "text",
      },
      salesStrategy: {
        label: "Sales strategy & Pricing model",
        type: "text",
      },
      traction: {
        label: "Traction",
        type: "text",
      },
      pilotsCustomers: {
        label: "Pilots & customers",
        type: "text",
      },
      metrics: {
        label: "Metrics",
        type: "text",
      },
    },

    assessments: ["isBusinessModelSolid", "areNumbersPromising"],
  },
  Funding: {
    fields: {
      howIsCompanyFunded: {
        label: "How is the company funded?",
        type: "text",
      },
      amountRaisedToDate: {
        label: "Amount raised to date",
        type: "text",
      },
      yourInvestors: {
        label: "Your investors",
        type: "text",
      },
      fundingObjective: {
        label: "Funding objective",
        type: "text",
      },
    },

    assessments: ["isFundingSolid"],
  },
  Team: {
    fields: {
      numberOfFounders: {
        label: "Number of founders",
        type: "text",
      },
      overallTeamSize: {
        label: "Overall team size (including founders)",
        type: "text",
      },
      foundersQualification: {
        label: "Founder’s qualification/ background",
        type: "text",
      },
    },

    assessments: ["isTeamExperienced"],
  },
  Impact: {
    fields: {
      howImpact: {
        label:
          "How can your startup help generate an impact for our future cities, especially Hamburg ?",
        type: "text",
      },
      whatDegreeSustainability: {
        label:
          "To what degree is sustainability integrated into the business model ?",
        type: "text",
      },
      connectionToHamburg: {
        label: "Do you have a connection to Hamburg ?",
        type: "text",
      },
      collaborateWithEntityHamburg: {
        label: "Do you already collaborate with any entity from Hamburg ?",
        type: "text",
      },
      howDidYouHearAboutFHA: {
        label: "How did you hear about the Future Hamburg Award ?",
        type: "text",
      },
    },

    assessments: ["willFutureCitiesBenefit", "isComplianceWithSDG"],
  },
  Media: {
    fields: {
      website: {
        label: "WebSite",
        type: "text",
      },
      companyLogo: {
        label: "Company Logo",
        type: "mediaArray",
      },
      companyDeck: {
        label: "Company Deck",
        type: "mediaArray",
      },
    },

    assessments: ["isPresentationGood"],
  },
};

const ApplicationHelper = new ApplicationC(ApplicationObject);
export default Application;

export type { ApplicationType, Key };
export { ApplicationHelper };
