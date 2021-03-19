import { shallowEqual, useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { RootState } from "redux/Reducers/RootReducer";

export default function useApplication(id: string) {
  useFirestoreConnect({ collection: "applications", doc: id });
  const { application } = useSelector(
    (state: RootState) => ({
      application:
        state.firestore.data.applications &&
        state.firestore.data.applications[id],
    }),
    shallowEqual
  );

  return {
    application,
  };
}
