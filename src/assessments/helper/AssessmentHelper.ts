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

  sumMultipleOld = (): {
    add: (id: string, num: number | undefined) => void;
    getResult: () => { [K: string]: number };
  } => {
    const collectors: { [k: string]: number[] } = {};
    return {
      add: (id: string, num: number | undefined) => {
        if (!collectors[id]) collectors[id] = [];
        if (num) collectors[id].push(num);
      },
      getResult: () => {
        return Object.entries(collectors).reduce(
          (acc, [key, values]) => ({
            ...acc,
            [key]:
              values.reduce((acc2, v) => (v ? v + acc2 : acc2)) / values.length,
          }),
          {}
        );
      },
    };
  };

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
  sumAssessmentPointsB(assessment: IAssessmentRecord) {
    let res = 0;
    let isOk = true;
    for (let p of this.getQuestions()) {
      const value = assessment[p.source as keyof IAssessmentRecord];
      if (value && typeof value === "number") {
        res = res + value * (p.weight || 1);
      } else {
        isOk = false;
        break;
      }
    }
    return isOk ? res : 0;
  }

  sumAssessmentPointsForJudgeApp(assessment: IAssessmentRecord) {
    let res = 0;

    return res;
  }

  // getAvarage(assessment: IAssessmentRecord) {
  //   let res = 0;
  //   let count = 0;
  //   for (let p of this.getQuestions()) {
  //     const value = assessment[p.source as keyof IAssessmentRecord];
  //     if (value && typeof value === "number") {
  //       res = res + value;
  //       count++;
  //     }
  //   }

  //   return count === 11 ? res / count : undefined;
  // }

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

  // getSumApplication = (
  //   application: IApplicationRecord,
  //   judges: JudgeData,
  //   sumIn100: boolean,
  //   integrateJudgeAverages: boolean,
  //   judgeAverages: IJudgeAverages
  // ) => {
  //   const main = this.getAverage();
  //   const pre = this.getAverage();
  //   const acc = this.getAverage();

  //   if (!judges) {
  //     return {
  //       sum: undefined,
  //       pre: undefined,
  //       main: undefined,
  //     };
  //   }

  //   if (application.assessments) {
  //     Object.values(application.assessments).forEach((_assessment) => {
  //       if (_assessment.status === "hidden") {
  //         return;
  //       }

  //       const assessment = this.evaluateAssessment(
  //         _assessment,
  //         sumIn100,
  //         integrateJudgeAverages,
  //         judgeAverages
  //       );
  //       assessment.sum && acc.add(assessment.sum);
  //       if (judges[assessment.judge_id].judgeType === "main") {
  //         assessment.sum && main.add(assessment.sum);
  //       } else {
  //         assessment.sum && pre.add(assessment.sum);
  //       }
  //     });
  //   }

  //   return {
  //     sum: acc.getResult(),
  //     pre: pre.getResult(),
  //     main: main.getResult(),
  //   };
  // };
}

const AssessmentHelper = new AssessmentC(Fields);

export { AssessmentHelper };
