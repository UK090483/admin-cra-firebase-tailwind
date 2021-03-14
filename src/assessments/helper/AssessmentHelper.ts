import { IAssessmentRecord } from "assessments/types";
import { IApplicationRecord } from "../../applications/ApplicationTypes";
import { IJudgeData } from "judges/state/judgesReducer";
import { Fields } from "./fields";
import { IJudgeAverages } from "applications/state/applicationsReducer";

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
  isComplianceWithSDGs: AssessmentField;
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

  // getMainField(name: AssessmentKey) {
  //   return this.fields[name].fields;
  // }

  // getLabel(name: AssessmentKey) {
  //   return this.fields[name].label;
  // }

  getQuestions() {
    const res = [];
    for (const [key, value] of entries(this.fields)) {
      // if (key !== "status" && key !== "sum") {
      res.push(this.fields[key]);
      // }
    }
    return res;
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

  sumAssessmentPointsForJudgeApp(assessment: IAssessmentRecord) {
    let res = 0;
    for (let p of this.getQuestions()) {
      const value = assessment[p.source as keyof IAssessmentRecord];
      if (value && typeof value === "number") {
        res += value;
      }
    }
    return res;
  }

  getAvarage(assessment: IAssessmentRecord) {
    let res = 0;
    let count = 0;
    for (let p of this.getQuestions()) {
      const value = assessment[p.source as keyof IAssessmentRecord];
      if (value && typeof value === "number") {
        res = res + value;
        count++;
      }
    }

    return count === 11 ? res / count : undefined;
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

  evaluateTableData(
    applications: IApplicationRecord[],
    judges: IJudgeData,
    sumIn100?: boolean,
    integrateJudgeAverages?: boolean,
    judgeAverages?: IJudgeAverages
  ) {
    return applications.map((application) => {
      const { sum, main, pre } = this.getSumApplication(
        application,
        judges,
        (sumIn100 = sumIn100 ? true : false),
        (integrateJudgeAverages = integrateJudgeAverages ? true : false),
        (judgeAverages = judgeAverages ? judgeAverages : {})
      );
      return {
        ...application,
        sum,
        mainSum: main,
        preSum: pre,
      } as IApplicationRecord;
    });
  }

  private getAverage = () => {
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

  getSumApplication = (
    application: IApplicationRecord,
    judges: IJudgeData,
    sumIn100: boolean,
    integrateJudgeAverages: boolean,
    judgeAverages: IJudgeAverages
  ) => {
    const main = this.getAverage();
    const pre = this.getAverage();
    const acc = this.getAverage();

    if (!judges) {
      return {
        sum: undefined,
        pre: undefined,
        main: undefined,
      };
    }

    if (application.assessments) {
      Object.values(application.assessments).forEach((_assessment) => {
        if (_assessment.status === "hidden") {
          return;
        }

        const assessment = this.evaluateAssessment(
          _assessment,
          sumIn100,
          integrateJudgeAverages,
          judgeAverages
        );
        assessment.sum && acc.add(assessment.sum);
        if (judges[assessment.judge_id].judgeType === "main") {
          assessment.sum && main.add(assessment.sum);
        } else {
          assessment.sum && pre.add(assessment.sum);
        }
      });
    }

    return {
      sum: acc.getResult(),
      pre: pre.getResult(),
      main: main.getResult(),
    };
  };
}

const AssessmentHelper = new AssessmentC(Fields);

export { AssessmentHelper };
