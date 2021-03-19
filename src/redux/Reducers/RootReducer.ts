import { combineReducers } from "redux";
import { firebaseReducer, FirebaseReducer } from "react-redux-firebase";

import uiReducer from "./UIReducer";

import { IUiState } from "./UIReducer";

import JudgeAppReducer, {
  IJudgeAppState,
} from "JudgeApp/state/JudgeAppReducer";

import { firestoreReducer } from "redux-firestore";
import { IJudgeRecord } from "../../judges/JudgeTypes";
import assessmentReducer, {
  IAssessmentState,
} from "assessments/state/assessmentReducer";

interface FirebaseState {
  auth: any;
}

export interface JudgeData {
  [K: string]: IJudgeRecord;
}

interface FireStoreData {
  judges?: JudgeData;
  applications?: any;
  tableDoc?: any;
  users?: any;
}
interface FireStoreOrdered {
  judges?: IJudgeRecord[];
  applications?: any;
  tableDoc?: any;
  users?: any;
}

interface FireStoreReducer {
  data: FireStoreData;
  ordered: FireStoreOrdered;
}

interface UserProfile {
  email: string;
  assessments?: any;
}
interface DBSchema {
  [name: string]: any;
}

export interface RootState {
  ui: IUiState;
  fb: FirebaseReducer.Reducer<UserProfile, DBSchema>;
  firestore: FireStoreReducer;
  judgeApp: IJudgeAppState;
  assessments: IAssessmentState;
  // applications: IApplicationState;
  // judges: IJudgeState;
  // users: IUserState;
}

const rootReducer = combineReducers({
  ui: uiReducer,
  fb: firebaseReducer,
  firestore: firestoreReducer,
  judgeApp: JudgeAppReducer,
  assessments: assessmentReducer,
  // applications: applicationsReducer,
  // judges: judgeReducer,
  // users: usersReducer,
});

export default rootReducer;
