import { IAssessmentRecord } from "assessments/types";
import { jotFormDataMaper } from "exampleJotform";
import { get } from "lodash";
import Application from "judges/views/Judge";
import TextInput from "components/Form/FormInputs/TextInput";
import ListInput from "components/Form/FormInputs/ListInput";
import MediaUpload from "components/Form/FormInputs/MediaArrayInput";

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
  application: ApplicationType;

  constructor(a: ApplicationType) {
    this.application = a;
  }

  getTopics(): string[] {
    return Object.keys(this.application).map((key) => key);
  }

  getFields(
    topic: keyof ApplicationType
  ): { key: string; field: ApplicationField }[] {
    return Object.keys(this.application[topic].fields).map((key) => {
      return { key, field: this.application[topic].fields[key] };
    });
  }

  getAllFields(): GetAllFieldsResult {
    const res: any = {};

    Object.keys(this.application).forEach((key) => {
      Object.keys(this.application[key].fields).forEach((element) => {
        res[element] = this.application[key].fields[element];
      });
    });

    return res;
  }

  getTopicLabel(topic: keyof ApplicationType): string {
    const difference = {
      BasicInformation: "Basic information",
      StartupOverview: "Startup overview",
    };

    // @ts-ignore
    return difference[topic] ? difference[topic] : topic;
  }

  getAssessments(
    topic: keyof ApplicationType
  ): AssessmentTypeKey[] | undefined {
    return this.application[topic].assessments;
  }

  parseJotFormData(jotformData: IJotFormData) {
    const res: IJotFormData = {};
    Object.keys(this.application).forEach((key) => {
      Object.keys(this.application[key].fields).forEach((element) => {
        res[element] = get(jotformData, jotFormDataMaper[element]);
      });
    });

    Object.keys(jotFormDataMaper).forEach((element) => {
      res[element] = get(jotformData, jotFormDataMaper[element]);
    });

    return res;
  }
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
        label: "Startup overview",
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
        input: (
          <TextInput
            label={"Revenue sources"}
            name={"revenueSources"}
            textarea
          />
        ),
      },
      salesStrategy: {
        label: "Sales strategy & Pricing model",
        type: "text",
        input: (
          <TextInput
            label={"Sales strategy & Pricing model"}
            name={"salesStrategy"}
            textarea
          />
        ),
      },
      traction: {
        label: "Traction",
        type: "text",
        input: <TextInput label={"traction"} name={"traction"} textarea />,
      },
      pilotsCustomers: {
        label: "Pilots & customers",
        type: "text",
        input: (
          <TextInput
            label={"Pilots & customers"}
            name={"pilotsCustomers"}
            textarea
          />
        ),
      },
      metrics: {
        label: "Metrics",
        type: "text",
        input: <TextInput label={"Metrics"} name={"metrics"} textarea />,
      },
    },

    assessments: ["isBusinessModelSolid", "areNumbersPromising"],
  },
  Funding: {
    fields: {
      howIsCompanyFunded: {
        label: "How is the company funded?",
        type: "text",
        input: (
          <TextInput
            label={"How is the company funded?"}
            name={"howIsCompanyFunded"}
            textarea
          />
        ),
      },
      amountRaisedToDate: {
        label: "Amount raised to date",
        type: "text",
        input: (
          <TextInput
            label={"Amount raised to date"}
            name={"amountRaisedToDate"}
            textarea
          />
        ),
      },
      yourInvestors: {
        label: "Your investors",
        type: "text",
        input: (
          <TextInput label={"Your investors"} name={"yourInvestors"} textarea />
        ),
      },
      fundingObjective: {
        label: "Funding objective",
        type: "text",
        input: (
          <TextInput
            label={"Funding objective"}
            name={"fundingObjective"}
            textarea
          />
        ),
      },
    },

    assessments: ["isFundingSolid"],
  },
  Team: {
    fields: {
      numberOfFounders: {
        label: "Number of founders",
        type: "text",
        input: (
          <TextInput label={"Number of founders"} name={"numberOfFounders"} />
        ),
      },
      overallTeamSize: {
        label: "Overall team size (including founders)",
        type: "text",
        input: (
          <TextInput
            label={"Overall team size (including founders)"}
            name={"overallTeamSize"}
          />
        ),
      },
      foundersQualification: {
        label: "Founder’s qualification/ background",
        type: "text",
        input: (
          <TextInput
            label={"Founder’s qualification/ background"}
            name={"foundersQualification"}
            textarea
          />
        ),
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
        input: (
          <TextInput
            label={
              "How can your startup help generate an impact for our future cities, especially Hamburg ?"
            }
            name={"howImpact"}
            textarea
          />
        ),
      },
      whatDegreeSustainability: {
        label:
          "To what degree is sustainability integrated into the business model ?",
        type: "text",
        input: (
          <TextInput
            label={
              "To what degree is sustainability integrated into the business model ?"
            }
            name={"whatDegreeSustainability"}
            textarea
          />
        ),
      },
      connectionToHamburg: {
        label: "Do you have a connection to Hamburg ?",
        type: "text",
        input: (
          <TextInput
            label={"Do you have a connection to Hamburg ?"}
            name={"connectionToHamburg"}
            textarea
          />
        ),
      },
      collaborateWithEntityHamburg: {
        label: "Do you already collaborate with any entity from Hamburg ?",
        type: "text",
        input: (
          <TextInput
            label={"Do you already collaborate with any entity from Hamburg ?"}
            name={"collaborateWithEntityHamburg"}
            textarea
          />
        ),
      },
      howDidYouHearAboutFHA: {
        label: "How did you hear about the Future Hamburg Award ?",
        type: "text",
        input: (
          <TextInput
            label={"How did you hear about the Future Hamburg Award ?"}
            name={"howDidYouHearAboutFHA"}
            textarea
          />
        ),
      },
    },

    assessments: ["willFutureCitiesBenefit", "isComplianceWithSDG"],
  },
  Media: {
    fields: {
      website: {
        label: "Website",
        type: "text",
        input: <TextInput label={"Website"} name={"website"} />,
      },
      companyLogo: {
        label: "Company Logo",
        type: "mediaArray",
        input: <MediaUpload label={"Company Logo"} name={"companyLogo"} />,
      },
      companyDeck: {
        label: "Company Deck",
        type: "mediaArray",
        input: <MediaUpload label={"Company Deck"} name={"companyDeck"} />,
      },
    },

    assessments: ["isPresentationGood"],
  },
};

const ApplicationHelper = new ApplicationC(ApplicationObject);
export default Application;

export type { ApplicationType, Key };
export { ApplicationHelper };
