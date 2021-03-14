import { combineReducers } from "redux";
import { firebaseReducer, FirebaseReducer } from "react-redux-firebase";
import uiReducer from "./UIReducer";

import { IUiState } from "./UIReducer";

// import judgeReducer, { IJudgeState } from "judges/state/judgesReducer";

import applicationsReducer, {
  IApplicationState,
} from "applications/state/applicationsReducer";
import usersReducer, { IUserState } from "users/state/usersReducer";

import JudgeAppReducer, {
  IJudgeAppState,
} from "JudgeApp/state/JudgeAppReducer";

import { firestoreReducer } from "redux-firestore";

interface FirebaseState {
  auth: any;
}
interface FireStoreState {
  [k: string]: any;
}

interface UserProfile {
  email: string;
}
interface DBSchema {
  [name: string]: any;
}

export interface RootState {
  ui: IUiState;
  fb: FirebaseReducer.Reducer<UserProfile, DBSchema>;
  firestore: FireStoreState;
  judgeApp: IJudgeAppState;
  applications: IApplicationState;
  // judges: IJudgeState;
  users: IUserState;
}

const rootReducer = combineReducers({
  ui: uiReducer,
  fb: firebaseReducer,
  firestore: firestoreReducer,
  judgeApp: JudgeAppReducer,
  applications: applicationsReducer,
  // judges: judgeReducer,
  users: usersReducer,
});

export default rootReducer;
