import { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { RootState } from "redux/Reducers/RootReducer";
import { fetchApplicationList } from "applications/state/applicationsReducer";
import { useFirestoreConnect } from "react-redux-firebase";
import { selectAllApplications } from "../state/applicationSelectors";

export default function useApplications() {
  const dispatch = useDispatch();

  const { data, assessmentsByJudgeId, loadedAt, loading } = useSelector(
    (state: RootState) => ({
      data: selectAllApplications(state),
      loadedAt: state.applications.loadedAt,
      assessmentsByJudgeId: state.applications.assessmentsByJudgeId,
      loading: state.applications.loading,
    }),
    shallowEqual
  );

  // const { changed } = useSelector(
  //   (state: RootState) => ({
  //     changed: state.firestore.data.applications,
  //   }),
  //   shallowEqual
  // );

  useFirestoreConnect([{ collection: "tableDoc", doc: "first" }]);

  const { ordered } = useSelector(
    (state: RootState) => ({
      ordered: state.firestore.data.tableDoc?.first
        ? Object.entries(
            state.firestore.data.tableDoc.first // @ts-ignore
          ).map(([key, value]) => ({ ...value, id: key }))
        : [],
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(fetchApplicationList());
  }, []);

  // const ordered = Object.entries(data).map((item) => ({
  //   ...item[1],
  //   id: item[0],
  // }));

  return { data: data, ordered, assessmentsByJudgeId, loading, loadedAt };
}
