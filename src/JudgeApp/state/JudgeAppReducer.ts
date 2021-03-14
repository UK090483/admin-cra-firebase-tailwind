import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import {
  IApplicationAssessment,
  IApplicationRecord,
} from "applications/ApplicationTypes";
import { FirebaseTimestamp } from "types";
import { RootState } from "redux/Reducers/RootReducer";
import { IAssessmentRecord } from "assessments/types";
import { getApplications } from "./Api/getApplications";
import { updateApplicationAssessment } from "./Api/updateApplicationAssessment";
import Judges from "../../judges/views/Judges";

interface data {
  [name: string]: IApplicationRecord;
}

interface relationShipData {
  [name: string]: IAssessmentRecord;
}

export interface IJudgeAppState {
  data: data;
  loading: boolean | null;
  error: boolean | null;
  success: boolean | null;
  loadedAt: FirebaseTimestamp | null;
  showIntro: boolean;
}

interface IFetchApplicationListProps {
  refresh: boolean;
}

const judgeAppFetchApplicationList = createAsyncThunk(
  "judgesApp/fetchList",
  async (props: IFetchApplicationListProps | undefined, thunkApi) => {
    const state: RootState = thunkApi.getState() as RootState;
    const response = await getApplications();
    return response;
  }
);

interface IChange {
  [k: string]: any;
}

interface IUpdateAssessmentProps {
  applicationId: string;
  nextAssessments: IApplicationAssessment;
}
const updateAssessmentAction = createAsyncThunk(
  "judgesApp/updateAssessment",
  async (props: IUpdateAssessmentProps) => {
    const response = await updateApplicationAssessment(props);
    return response;
  }
);

const toggleInfoAction = createAction("judgesApp/toggleInfo");

const initialState: IJudgeAppState = {
  data: {},
  loading: null,
  error: null,
  success: null,
  loadedAt: null,
  showIntro: true,
};

const JudgeAppSlice = createSlice({
  name: "applications",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(judgeAppFetchApplicationList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(judgeAppFetchApplicationList.fulfilled, (state, action) => {
        action.payload.forEach((application) => {
          state.data[application.id] = application;
        });
        state.success = true;
        state.loading = false;
      })
      .addCase(updateAssessmentAction.pending, (state, action) => {
        state.data[action.meta.arg.applicationId].assessments =
          action.meta.arg.nextAssessments;
        state.loading = true;
      })
      .addCase(updateAssessmentAction.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
      })
      .addCase(toggleInfoAction, (state, action) => {
        state.showIntro = !state.showIntro;
      });
  },
});

export {
  judgeAppFetchApplicationList,
  updateAssessmentAction,
  toggleInfoAction,
};

export default JudgeAppSlice.reducer;
