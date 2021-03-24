import { AnyAction, createAction, createSlice } from "@reduxjs/toolkit";
import { contains, each, has, isObject } from "underscore";
import { AssessmentHelper } from "../../assessments/helper/AssessmentHelper";

export interface IJudgeAppState {
  judgeType: string | null;
  judgeId: string | null;
  showIntro: boolean;
  allDone: boolean;
  assessments: { [assessment_id: string]: boolean };
  assessmentCount: number | null;
  assessmentsDoneCount: number | null;
}

function newAssessments(action: AnyAction): action is AnyAction {
  return action.type === "@@reactReduxFirebase/SET_PROFILE";
}

function tableDoc(action: AnyAction): action is AnyAction {
  return (
    action.type === "@@reduxFirestore/LISTENER_RESPONSE" &&
    action?.meta?.collection === "tableDoc"
  );
}

const toggleInfoAction = createAction("judgesApp/toggleInfo");

const initialState: IJudgeAppState = {
  judgeType: null,
  judgeId: null,
  showIntro: true,
  allDone: false,
  assessments: {},
  assessmentCount: null,
  assessmentsDoneCount: null,
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
        state.judgeId = action.profile.id;
        state.judgeType = action.profile.judgeType;
        let count = 0;
        if (action.profile.assessments) {
          if (!isObject(action.profile.assessments)) return;

          each(action.profile.assessments, (assessment) => {
            const done =
              AssessmentHelper.getAssessmentState(assessment) === "completed";
            if (done) {
              count++;
            }

            state.assessments[assessment.application_id] = done;
          });
        }
        state.assessmentsDoneCount = count;

        if (state.assessmentCount === count && count !== 0) {
          state.allDone = true;
        } else {
          state.allDone = false;
        }
      })
      .addMatcher(tableDoc, (state, action) => {
        const res: string[] = [];
        if (!isObject(action.payload.data)) return;
        each(action.payload.data, (table, tableId) => {
          each(table, (application, application_id) => {
            if (
              state.judgeId &&
              has(application, "assessments") && // @ts-ignore
              contains(application.assessments, state.judgeId)
            ) {
              res.push(application_id);

              if (!state.assessments[application_id]) {
                state.assessments[application_id] = false;
              } else {
                console.log("already there");
              }
            }
          });
        });
        state.assessmentCount = res.length;

        if (state.assessmentsDoneCount === res.length && res.length !== 0) {
          state.allDone = true;
        } else {
          state.allDone = false;
        }
      });
  },
});

export { toggleInfoAction };

export default JudgeAppSlice.reducer;
