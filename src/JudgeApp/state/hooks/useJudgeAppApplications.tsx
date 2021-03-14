import * as React from "react";

import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { RootState } from "redux/Reducers/RootReducer";
import { judgeAppFetchApplicationList } from "../JudgeAppReducer";

const useJudgeAppApplications = () => {
  const dispatch = useDispatch();
  const { applications, applicationsData, loading, success } = useSelector(
    (state: RootState) => ({
      applications: state.judgeApp.data,
      applicationsData: Object.values(state.judgeApp.data).map((item) => item),
      loading: state.judgeApp.loading,
      success: state.judgeApp.success,
    }),
    shallowEqual
  );

  React.useEffect(() => {
    if (!success) {
      if (!loading) {
        dispatch(judgeAppFetchApplicationList());
      }
    }
  }, []);

  return { applications, applicationsData };
};

export { useJudgeAppApplications };
