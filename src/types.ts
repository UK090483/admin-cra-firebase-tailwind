import { Timestamp } from "@firebase/firestore-types";

export type Identifier = string;

export type FirebaseTimestamp = Timestamp;

export type RoutingParam = {
  id: Identifier;
};

export interface RecordBase {
  id: Identifier;
  created_at: Timestamp;
  created_by: Identifier;
  updated_at: Timestamp;
  updated_by: Identifier;
}

export type stage =
  | "first_filter"
  | "assign_prejudges"
  | "first_evaluation"
  | "final_evaluation";
