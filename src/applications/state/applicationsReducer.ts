import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getList } from "redux/api/getList";
import { IApplicationRecord } from "applications/ApplicationTypes";
import { firebase } from "misc/firebase";
import { FirebaseTimestamp } from "types";
import { RootState } from "redux/Reducers/RootReducer";
import { updateOne } from "redux/api/updateOne";
import { IApplicationUpdateAbles } from "../ApplicationTypes";
import { AssessmentStatus, IAssessmentRecord } from "assessments/types";
import { updateValue } from "../../redux/api/updateValue";
import { updateAssessmentStatusAction } from "./cases/updateAssessmentStatus";
import { evaluateAssessments } from "./helper/evaluateAssessments";
import { getJudgeAverages } from "./helper/getJudgeAverages";
import { getAssessmentsById } from "./helper/getAssessmentsById";

type Returned = IApplicationRecord[];

interface data {
  [name: string]: IApplicationRecord;
}

interface relationShipData {
  [name: string]: IAssessmentRecord;
}
interface relationShip {
  [name: string]: relationShipData;
}

export interface IJudgeAverages {
  [name: string]: number;
}

export interface IApplicationState {
  data: data;
  assessmentsByJudgeId: relationShip;
  judgeAverages: IJudgeAverages;
  loading: boolean | null;
  error: boolean | null;
  success: boolean | null;
  loadedAt: FirebaseTimestamp | null;
}

interface IFetchApplicationListProps {
  refresh: boolean;
}

const fetchApplicationList = createAsyncThunk(
  "applications/fetchList",
  async (props: IFetchApplicationListProps | undefined, thunkApi) => {
    const state: RootState = thunkApi.getState() as RootState;
    const response = await getList({
      resource: "applications",
      lastLoadedAt: props && props.refresh ? null : state.applications.loadedAt,
    });

    console.log(`fetched ${response.length} Applications`);
    return response as Returned;
  }
);

interface IUpdateApplicationParams {
  data: IApplicationUpdateAbles;
  id: string;
}

const updateApplicationAction = createAsyncThunk(
  "applications/updateApplication",
  async (props: IUpdateApplicationParams) => {
    const response = await updateOne({ ...props, resource: "applications" });

    return response;
  }
);

const initialState: IApplicationState = {
  data: {},
  assessmentsByJudgeId: {},
  judgeAverages: {},
  loading: null,
  error: null,
  success: null,
  loadedAt: null,
};

const ApplicationSlice = createSlice({
  name: "applications",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicationList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchApplicationList.fulfilled, (state, action) => {
        action.payload.forEach((application) => {
          state.data[application.id] = evaluateAssessments(application);
          getAssessmentsById(application, state);
        });

        getJudgeAverages(state);
        state.loadedAt = firebase.firestore.Timestamp.now();
        state.loading = false;
      })
      .addCase(updateApplicationAction.pending, (state, action) => {
        Object.entries(action.meta.arg.data).forEach(([key, value]) => {
          state.data[action.meta.arg.id][
            key as keyof IApplicationUpdateAbles
          ] = value;
        });

        // Object.values(state.data).forEach((application) => {
        //   getAssessmentsById(application as IApplicationRecord, state);
        // });
      })
      .addCase(updateAssessmentStatusAction.pending, (state, action) => {
        if (state.data[action.meta.arg.application_id].assessments) {
          // @ts-ignore
          state.data[action.meta.arg.application_id].assessments[
            action.meta.arg.judge_id
          ].status = action.meta.arg.status;
        }

        Object.values(state.data).forEach((application) => {
          getAssessmentsById(application as IApplicationRecord, state);
        });
      });
  },
});

export {
  fetchApplicationList,
  updateApplicationAction,
  updateAssessmentStatusAction,
};

export default ApplicationSlice.reducer;
