import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getList } from "redux/api/getList";
import { FirebaseTimestamp } from "types";
import { RootState } from "redux/Reducers/RootReducer";
import firebase from "misc/firebase";
import { IJudgeRecord } from "judges/JudgeTypes";
import { createOne } from "../../redux/api/createOne";
import { updateOne } from "redux/api/updateOne";

type Returned = IJudgeRecord[];

export interface IJudgeData {
  [name: string]: any;
}

export interface IJudgeState {
  data: IJudgeData;
  loading: boolean | null;
  error: boolean | null;
  success: boolean | null;
  loadedAt: FirebaseTimestamp | null;
}

// const fetchJudgeList = createAsyncThunk(
//   "judges/fetchList",
//   async (props: undefined, thunkApi) => {
//     const state: RootState = thunkApi.getState() as RootState;
//     const response = await getList({
//       resource: "judges",
//       lastLoadedAt: state.judges.loadedAt,
//     });
//     return response as Returned;
//   }
// );

interface IAddJudgeActionProps {
  name: string;
  email: string;
  id: string;
  color: string;
  type: string;
  active: boolean;
}

const addJudgeAction = createAsyncThunk(
  "judges/addJudge",
  async (props: IAddJudgeActionProps) => {
    const response = await createOne({
      resource: "judges",
      data: props,
      id: props.id,
    });
    return response;
  }
);

const updateJudgeAction = createAsyncThunk(
  "judges/updateJudge",
  async (props: IAddJudgeActionProps) => {
    const response = await updateOne({
      resource: "judges",
      data: props,
      id: props.id,
    });
    return response;
  }
);

const initialState: IJudgeState = {
  data: {},
  loading: null,
  error: null,
  success: null,
  loadedAt: null,
};

// const JudgeSlice = createSlice({
//   name: "judges",
//   initialState: initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchJudgeList.pending, (state, action) => {
//         state.loading = true;
//       })
//       .addCase(fetchJudgeList.fulfilled, (state, action) => {
//         action.payload.forEach((judge) => {
//           state.data[judge.id] = judge;
//         });
//         state.loadedAt = firebase.firestore.Timestamp.now();
//         state.success = true;
//       })
//       .addCase(addJudgeAction.pending, (state, action) => {
//         const { id } = action.meta.arg;
//         state.data[id] = action.meta.arg;
//       })
//       .addCase(updateJudgeAction.pending, (state, action) => {
//         const { id } = action.meta.arg;
//         state.data[id] = action.meta.arg;
//       });
//   },
// });

// export { fetchJudgeList, addJudgeAction, updateJudgeAction };

// export default JudgeSlice.reducer;

export {};
