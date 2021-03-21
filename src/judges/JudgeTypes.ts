import { RecordBase } from "types";
import { IAssessmentRecord } from "../assessments/types";

export type judgeType = "pre" | "main";
export type judgeState = "active" | "done";

interface IJudgeAssessments {
  [K: string]: IAssessmentRecord;
}

export interface IJudgeRecord extends RecordBase {
  color: string;
  email: string;
  name: string;
  judgeType: judgeType;
  active: boolean;
  assessments?: IJudgeAssessments;
  state: judgeState;
}
