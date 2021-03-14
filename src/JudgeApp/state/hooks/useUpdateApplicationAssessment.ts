import * as React from "react";

import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { RootState } from "../../../redux/Reducers/RootReducer";
import { updateAssessmentAction } from "../JudgeAppReducer";
import { IApplicationRecord } from "../../../applications/ApplicationTypes";

const useUpdateApplicationAssessment = (application: IApplicationRecord) => {
  const { judgeId } = useSelector((state: RootState) => ({
    judgeId: state.fb.auth.uid,
  }));
  const dispatch = useDispatch();

  const updateAssessment = (res: any) => {
    const assessments = application.assessments ? application.assessments : {};

    if (judgeId && assessments[judgeId]) {
      const nextAssessments = {
        ...assessments,
        [judgeId]: { ...assessments[judgeId], ...res },
      };

      dispatch(
        updateAssessmentAction({
          applicationId: application.id,
          nextAssessments,
        })
      );
    }
  };

  return { updateAssessment };
};

export { useUpdateApplicationAssessment };
