import { createAction, createSlice } from "@reduxjs/toolkit";

export interface IJudgeAppState {
  showIntro: boolean;
}

const toggleInfoAction = createAction("judgesApp/toggleInfo");

const initialState: IJudgeAppState = {
  showIntro: true,
};

const JudgeAppSlice = createSlice({
  name: "judgesApp",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(toggleInfoAction, (state, action) => {
      state.showIntro = !state.showIntro;
    });
  },
});

export { toggleInfoAction };

export default JudgeAppSlice.reducer;
