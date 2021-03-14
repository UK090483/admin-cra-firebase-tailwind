import { RecordBase } from "types";

export type judgeType = "pre" | "main";

export interface IJudgeRecord extends RecordBase {
  color: string;
  email: string;
  name: string;
  judgeType: judgeType;
  active: boolean;
}
