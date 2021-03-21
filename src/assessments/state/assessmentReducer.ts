import { AnyAction, createSlice, current } from "@reduxjs/toolkit";
import {} from "redux-firestore";
import { difference, isEqual } from "underscore";
import { IJudgeRecord, judgeType } from "../../judges/JudgeTypes";
import { AssessmentHelper } from "../helper/AssessmentHelper";
import { IAssessmentRecord } from "../types";
import Judge from "../../layouts/judge/Judge";

export interface IAssessmentState {
  data: {
    [applicationId: string]: { [judgeId: string]: IAssessmentRecord };
  } | null;
  ordered: any[];
  assessmentCount: number;
  judgeAverages: { [judgeId: string]: number | undefined };
  sumByApplicationId: {
    [applicationId: string]: { main: number; pre: number; all: number };
  };
  judgeTypes: { [k: string]: judgeType };
  withJudgeAvr?: {
    [applicationId: string]: { main: number; pre: number; all: number };
  };
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
  withJudgeAvr: {},
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

        handleJudgeAvr(state);
      })
      .addMatcher(isModifiedJudge, (state, action) => {
        console.log("isModifiedJudge");
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

const handleJudgeAvr = (state: IAssessmentState) => {
  const collectSum = AssessmentHelper.sumMultiple();
  for (let applicationEntry of Object.entries(state.sumByApplicationId)) {
    const [applicationId, sum] = applicationEntry;
    const assessments = state.data && state.data[applicationId];
    if (!assessments) return;

    for (let assessmentEntry of Object.entries(assessments)) {
      const [judgeId, assessment] = assessmentEntry;
      const JudgeAvr = state.judgeAverages[judgeId];
      const JudgeType = state.judgeTypes[judgeId];

      if (JudgeAvr && JudgeType) {
        const SumWithAvr = (1 - JudgeAvr / 32 + 1) * sum[JudgeType];
        collectSum.add(applicationId, SumWithAvr, JudgeType);
      } else {
        console.error("unable to find judgeAvr or JudgeType");
      }
    }
  }
  console.log("handleJudgeAvr");
  state.withJudgeAvr = collectSum.getResult();
};
