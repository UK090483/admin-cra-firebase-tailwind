import { AnyAction, createSlice, current } from "@reduxjs/toolkit";
import {} from "redux-firestore";
import { difference, isEqual } from "underscore";
import { IJudgeRecord, judgeType } from "../../judges/JudgeTypes";
import { AssessmentHelper } from "../helper/AssessmentHelper";
import { IAssessmentRecord } from "../types";

export interface IAssessmentState {
  data: { [k: string]: { [A: string]: IAssessmentRecord } } | null;
  ordered: any[];
  assessmentCount: number;
  judgeAverages: { [A: string]: number | undefined };
  sumByApplicationId: {
    [A: string]: { main: number; pre: number; all: number };
  };
  judgeTypes: { [k: string]: judgeType };
}

function isJudgeResponse(action: AnyAction): action is AnyAction {
  return (
    action.type === "@@reduxFirestore/LISTENER_RESPONSE" &&
    action.meta.collection === "judges"
  );
}

function isModifiedJudge(action: AnyAction): action is AnyAction {
  return (
    action.type === "@@reduxFirestore/DOCUMENT_MODIFIED" &&
    action.meta.collection === "judges"
  );
}

const initialState: IAssessmentState = {
  data: {},
  ordered: [],
  assessmentCount: 0,
  judgeAverages: {},
  sumByApplicationId: {},
  judgeTypes: {},
};

const AssessmentSlice = createSlice({
  name: "judgesApp",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isJudgeResponse, (state, action) => {
        const collectSum = AssessmentHelper.sumMultiple();

        if (Array.isArray(action.payload.ordered)) {
          action.payload.ordered.forEach((judge: IJudgeRecord) => {
            state.judgeTypes[judge.id] = judge.judgeType;

            if (!judge.assessments) return;
            const judgeAvr = AssessmentHelper.getAverage();

            Object.values(judge.assessments).forEach(
              (assessment: IAssessmentRecord) => {
                const sum = AssessmentHelper.sumAssessmentPoints(
                  assessment as IAssessmentRecord
                );

                if (sum) judgeAvr.add(sum);

                //state.ordered.push({ ...assessment, sum: sum });

                state.assessmentCount++;

                AddingAssessmentsByApplicationId(state, assessment, sum);

                collectSum.add(assessment.application_id, sum, judge.judgeType);
              }
            );

            state.judgeAverages[judge.id] = judgeAvr.getResult();
            state.sumByApplicationId = collectSum.getResult();
          });
        }
      })
      .addMatcher(isModifiedJudge, (state, action) => {
        const currentData = current(state).data;
        const currentJudeTypes = current(state).judgeTypes;

        if (!action.payload.data) return;
        const _judge = action.payload.data as IJudgeRecord;
        if (_judge.assessments) {
          const judgeAvr = AssessmentHelper.getAverage();
          Object.values(_judge.assessments).forEach((assessment) => {
            const sum = AssessmentHelper.sumAssessmentPoints(assessment);

            if (sum) judgeAvr.add(sum);

            AddingAssessmentsByApplicationId(state, assessment, sum);

            const newSum = updateSumNeeded(
              currentData,
              currentJudeTypes,
              assessment
            );

            if (newSum) {
              state.sumByApplicationId[assessment.application_id] =
                newSum[assessment.application_id];
            }
          });
          state.judgeAverages[action.payload.id] = judgeAvr.getResult();
        }
      });
  },
});

export default AssessmentSlice.reducer;

const AddingAssessmentsByApplicationId = (
  state: any,
  assessment: IAssessmentRecord,
  sum: number | undefined
) => {
  if (!state.data[assessment.application_id])
    state.data[assessment.application_id] = {};

  state.data[assessment.application_id][assessment.judge_id] = {
    ...assessment,
    sum: sum,
  };
};

const updateSumNeeded = (
  currentData: any,
  currentJudeTypes: any,
  next: IAssessmentRecord
) => {
  const _currentAssessment =
    currentData[next.application_id] &&
    currentData[next.application_id][next.judge_id];
  if (!_currentAssessment) return null;

  if (AssessmentHelper.isEqual(_currentAssessment, next)) return null;

  const collectSum = AssessmentHelper.sumMultiple();

  for (let assessment of Object.values(currentData[next.application_id])) {
    if (assessment && typeof assessment === "object") {
      let _a = assessment as IAssessmentRecord;
      if (_currentAssessment.judge_id === _a.judge_id) {
        _a = next;
      }

      const sum = AssessmentHelper.sumAssessmentPoints(_a);
      collectSum.add(_a.application_id, sum, currentJudeTypes[_a.judge_id]);
    }
  }

  return collectSum.getResult();
};
