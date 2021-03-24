import { AnyAction, createSlice, current } from "@reduxjs/toolkit";
import { actionTypes } from "react-redux-firebase";
import { actionTypes as FsActionTypes } from "redux-firestore";
type error = {
  message: string;
};

export interface IErrorsState {
  errors: error[];
}

function isAuthError(action: AnyAction): action is AnyAction {
  return action.type === actionTypes.LOGIN_ERROR;
}
function isUpdateError(action: AnyAction): action is AnyAction {
  return action.type === FsActionTypes.UPDATE_FAILURE;
}

const initialState: IErrorsState = {
  errors: [],
};

const ErrorSlice = createSlice({
  name: "errors",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAuthError, (state, action) => {
        state.errors.push(action.authError);
      })
      .addMatcher(isUpdateError, (state, action) => {
        state.errors.push({ message: "Permission denied" });
      });
  },
});

export default ErrorSlice.reducer;
