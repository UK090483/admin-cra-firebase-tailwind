import { Record } from "types";

export interface IUserRecord extends Record {
  isAdmin: boolean;
  email: string;
  name: string;
}
