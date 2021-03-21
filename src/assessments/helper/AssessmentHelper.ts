import { IAssessmentRecord } from "assessments/types";
import { IApplicationRecord } from "../../applications/ApplicationTypes";
import { Fields } from "./fields";
// import { IJudgeAverages } from "applications/state/applicationsReducer";
import { IJudgeRecord, judgeType } from "../../judges/JudgeTypes";
import { JudgeData } from "redux/Reducers/RootReducer";
import { shallowEqual } from "react-redux";

export interface IJudgeAverages {
  [name: string]: number;
}

interface AssessmentField {
  label: string;
  type: string;
  source: string;
  weight?: number;
  shortLabel: string;

  fields?: AssessmentFields;
}

interface AssessmentFields {
  main: AssessmentField;
  more: AssessmentField[];
}

export type AssessmentTypeKey = keyof AssessmentType;

export interface AssessmentType {
  isInnovative: AssessmentField;
  isClearUSP: AssessmentField;
  isTherePotential: AssessmentField;
  doTheyKnowCompetitors: AssessmentField;
  isBusinessModelSolid: AssessmentField;
  areNumbersPromising: AssessmentField;
  isFundingSolid: AssessmentField;
  isTeamExperienced: AssessmentField;
  willFutureCitiesBenefit: AssessmentField;
  isComplianceWithSDG: AssessmentField;
  isPresentationGood: AssessmentField;
  // status: AssessmentField;
  // sum: AssessmentField;
}

// export type AssessmentType = {
//   [name in keyof IAssessmentRecord]: AssessmentField;
// };

type Entries<AssessmentType> = {
  [K in keyof AssessmentType]: [K, AssessmentType[K]];
}[keyof AssessmentType][];

function entries<AssessmentType>(obj: AssessmentType): Entries<AssessmentType> {
  return Object.entries(obj) as any;
}

export type AssessmentKey = keyof AssessmentType;

export class AssessmentC {
  fields: AssessmentType;
  constructor(fields: AssessmentType) {
    this.fields = fields;
  }

  getQuestions() {
    const res = [];
    for (const [key, value] of entries(this.fields)) {
      res.push(this.fields[key]);
    }
    return res;
  }
  getLabel(question: string): string {
    if (this.fields[question as keyof AssessmentType]) {
      return this.fields[question as keyof AssessmentType].label;
    }

    return question;
  }

  getQuestionsDetails() {
    const res: any = {};
    for (const [key, value] of entries(this.fields)) {
      // if (key !== "status" && key !== "sum") {
      res[key] = this.fields[key];
      // }
    }
    return res;
  }

  getTableFields() {
    const res = [];
    for (const [key, value] of entries(this.fields)) {
      res.push(this.fields[key]);
    }
    return res;
  }

  sumMultiple = (): {
    add: (id: string, num: number | undefined, judgeType: judgeType) => void;
    getResult: () => {
      [K: string]: { main: number; pre: number; all: number };
    };
  } => {
    const collectors: {
      [k: string]: { main: number[]; pre: number[]; all: number[] };
    } = {};
    return {
      add: (id, num, judgeType) => {
        if (!["pre", "main"].includes(judgeType))
          return console.error("judgeType not Provided in sumMultible");

        if (!collectors[id]) collectors[id] = { main: [], pre: [], all: [] };
        if (num) {
          collectors[id][judgeType].push(num);
          collectors[id].all.push(num);
        }
      },
      getResult: () => {
        return Object.entries(collectors).reduce(
          (acc, [key, values]) => ({
            ...acc,
            [key]: {
              main:
                values.main.length > 0
                  ? values.main.reduce((acc2, v) => (v ? v + acc2 : acc2)) /
                    values.main.length
                  : -1,
              pre:
                values.pre.length > 0
                  ? values.pre.reduce((acc2, v) => (v ? v + acc2 : acc2)) /
                    values.pre.length
                  : -1,
              all:
                values.all.length > 0
                  ? values.all.reduce((acc2, v) => (v ? v + acc2 : acc2)) /
                    values.all.length
                  : -1,
            },
          }),
          {}
        );
      },
    };
  };

  sumAssessmentPoints(assessment: IAssessmentRecord) {
    let res = 0;
    let isOk = true;
    if (assessment.status === "hidden") return undefined;
    for (let p of this.getQuestions()) {
      const value = assessment[p.source as keyof IAssessmentRecord];
      if (value && typeof value === "number") {
        res = res + value * (p.weight || 1);
      } else {
        isOk = false;
        break;
      }
    }
    return isOk ? res : undefined;
  }

  sumAssessmentPointsForJudgeApp(assessment: IAssessmentRecord) {
    let res = 0;
    for (let p of this.getQuestions()) {
      const value = assessment[p.source as keyof IAssessmentRecord];
      if (value && typeof value === "number") res += value;
    }
    return res;
  }

  getAssessmentState(assessment: IAssessmentRecord) {
    let hasValues = false;
    let hasOpenValues = false;
    for (let p of this.getQuestions()) {
      const value = assessment[p.source as keyof IAssessmentRecord];
      if (value && typeof value === "number") {
        hasValues = true;
      } else {
        hasOpenValues = true;
      }
    }
    return hasValues ? (hasOpenValues ? "processed" : "completed") : "assigned";
  }

  evaluateAssessment(
    assessment: IAssessmentRecord,
    sumIn100?: boolean,
    integrateJudgeAverages?: boolean,
    judgeAvreges?: IJudgeAverages
  ) {
    const sum = this.sumAssessmentPoints(assessment);
    if (sum) {
      const withIntegration =
        integrateJudgeAverages &&
        judgeAvreges &&
        judgeAvreges[assessment.judge_id]
          ? sum * (1 - (judgeAvreges[assessment.judge_id] - 2) / 2)
          : sum;
      // console.log("----");
      // judgeAvreges &&
      //   judgeAvreges[assessment.judge_id] &&
      //   console.log(judgeAvreges[assessment.judge_id]);
      // judgeAvreges &&
      //   judgeAvreges[assessment.judge_id] &&
      //   console.log(1 - (judgeAvreges[assessment.judge_id] - 2) / 2);

      // console.log(withIntegration);
      // console.log(sum);

      const evaluatedSum = sumIn100
        ? (withIntegration / 64) * 100
        : withIntegration;
      return { ...assessment, sum: evaluatedSum } as IAssessmentRecord;
    }
    return assessment;
  }

  isEqual = (first: any, second: any): boolean => {
    if (typeof first !== "object" || typeof first !== "object") {
      console.error("equal Function needs objects ");
      return false;
    }

    if (first["status"] !== second["status"]) return false;

    for (let q of this.getQuestions()) {
      if (first[q.source] !== second[q.source]) return false;
    }

    return true;
  };
  getAverage = () => {
    let count = 0;
    let sum = 0;

    return {
      add: (number: number) => {
        sum += number;
        count++;
      },
      getResult: () => {
        if (sum && count) {
          return Math.round((sum / count) * 100) / 100;
        }
        return undefined;
      },
    };
  };
}

const AssessmentHelper = new AssessmentC(Fields);

export { AssessmentHelper };
