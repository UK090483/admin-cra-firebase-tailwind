import { RecordBase } from "types";

export interface IUserRecord extends RecordBase {
  isAdmin: boolean;
  email: string;
  name: string;
}
