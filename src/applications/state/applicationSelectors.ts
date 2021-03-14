import { createSelector } from "reselect";
import { RootState } from "../../redux/Reducers/RootReducer";

export const selectAllApplications = createSelector(
  (state: RootState) => state.applications.data,
  (data) => data
);

export const selectApplicationById = createSelector(
  (state: RootState, id: string) =>
    state.applications.data[id] ? state.applications.data[id] : null,
  (data) => data
);
