import { Record } from "types";

export type judgeType = "pre" | "main";

export interface IJudgeRecord extends Record {
  color: string;
  email: string;
  name: string;
  judgeType: judgeType;
  active: boolean;
}
