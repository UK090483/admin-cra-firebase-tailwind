import * as React from "react";

import { IApplicationAssessment } from "applications/ApplicationTypes";
import { useDispatch } from "react-redux";
import {
  updateApplicationAction,
  updateAssessmentStatusAction,
} from "./applicationsReducer";
import { AssessmentStatus } from "assessments/types";

export const useAddJudges = () => {
  const dispatch = useDispatch();

  const addJudges = (id: string, assessments: IApplicationAssessment) =>
    dispatch(
      updateApplicationAction({
        id: id,
        data: { assessments: assessments },
      })
    );

  return addJudges;
};

export const useSetApplicationStatus = () => {
  const dispatch = useDispatch();

  const SetApplicationStatus = (
    application_id: string,
    judge_id: string,
    status: AssessmentStatus
  ) => {
    dispatch(
      updateAssessmentStatusAction({ application_id, judge_id, status })
    );
  };
  // dispatch(
  //   updateApplicationAction({
  //     id: application_id,
  //     data: { assessment: status },
  //   })
  // );

  return SetApplicationStatus;
};
