import { createAction, createReducer } from "@reduxjs/toolkit";
import { ITableFilterState, ITableSortState } from "components/Table/types";
import { stage } from "types";

const openSideBar = createAction("ui/openSideBar");
const closeSideBar = createAction("ui/closeSideBar");
const toggleSideBar = createAction("ui/toggleSideBar");
const setStage = createAction<stage>("ui/setStage");
const setTable = createAction<ITableState>("ui/setTable");
const setState = createAction<IUiState>("ui/setState");

interface ITableState {
  name: string;
  page: number;
  filter: ITableFilterState | null;
  sort: ITableSortState | null;
}

interface ITableStates {
  [name: string]: ITableState;
}

export interface IUiState {
  sidebarOpen: boolean;
  stage: stage;
  table: ITableStates;
  sumIn100: boolean;
  integrateJudgeAverages: boolean;
}

const initialState: IUiState = {
  sidebarOpen: true,
  stage: "first_filter",
  table: {},
  sumIn100: false,
  integrateJudgeAverages: false,
};

const uiReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(openSideBar, (state, action) => {
      state.sidebarOpen = true;
    })
    .addCase(closeSideBar, (state, action) => {
      state.sidebarOpen = true;
    })
    .addCase(toggleSideBar, (state, action) => {
      state.sidebarOpen = !state.sidebarOpen;
    })
    .addCase(setStage, (state, action) => {
      state.stage = action.payload;
    })
    .addCase(setTable, (state, action) => {
      state.table[action.payload.name] = action.payload;
    })
    .addCase(setState, (state, action) => {
      Object.keys(state).forEach((key) => {
        // @ts-ignore
        state[key] = action.payload[key];
      });
    });
});

export default uiReducer;

export {
  openSideBar,
  closeSideBar,
  toggleSideBar,
  setStage,
  setTable,
  setState,
};
