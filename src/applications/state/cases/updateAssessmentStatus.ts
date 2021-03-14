import { createAsyncThunk } from "@reduxjs/toolkit";
import { AssessmentStatus } from "assessments/types";
import { updateValue } from "redux/api/updateValue";

const updateAssessmentStatusAction = createAsyncThunk(
  "applications/updateAssessmentStatus",
  async (props: IUpdateAssessmentStatusParams, Api) => {
    const { status, application_id, judge_id } = props;

    const response = await updateValue({
      data: { [`assessments.${judge_id}.status`]: status },
      id: application_id,
      resource: "applications",
    });
    return response;
  }
);

interface IUpdateAssessmentStatusParams {
  status: AssessmentStatus;
  application_id: string;
  judge_id: string;
}

export { updateAssessmentStatusAction };
