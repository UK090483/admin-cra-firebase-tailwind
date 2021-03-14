import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IApplicationUpdateAbles } from "applications/ApplicationTypes";
import { updateOne } from "redux/api/updateOne";

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

export { updateApplicationAction };
