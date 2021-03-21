import {
  AssessmentHelper,
  AssessmentC,
} from "../../assessments/helper/AssessmentHelper";
import { IAssessmentRecord } from "../../assessments/types";
import { AnyAction, createAction, createSlice } from "@reduxjs/toolkit";

export interface IJudgeAppState {
  showIntro: boolean;
  allDone: boolean;
}

function newAssessments(action: AnyAction): action is AnyAction {
  return action.type === "@@reactReduxFirebase/SET_PROFILE";
}

const toggleInfoAction = createAction("judgesApp/toggleInfo");

const initialState: IJudgeAppState = {
  showIntro: true,
  allDone: false,
};

const JudgeAppSlice = createSlice({
  name: "judgesApp",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleInfoAction, (state, action) => {
        state.showIntro = !state.showIntro;
      })
      .addMatcher(newAssessments, (state, action) => {
        if (action.profile.assessments) {
          let allDone = true;
          for (let assessment of Object.values(action.profile.assessments)) {
            console.count("assessments");
            if (
              AssessmentHelper.getAssessmentState(
                assessment as IAssessmentRecord
              ) !== "completed"
            ) {
              allDone = false;
              break;
            }
          }

          if (allDone) state.allDone = true;
        }
      });
  },
});

export { toggleInfoAction };

export default JudgeAppSlice.reducer;
