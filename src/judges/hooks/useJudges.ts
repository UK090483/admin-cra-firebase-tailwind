import { useSelector } from "react-redux";
import { RootState } from "redux/Reducers/RootReducer";

export default function useJudges() {
  const { judgesOrdered, judges } = useSelector((state: RootState) => ({
    judgesOrdered:
      state.firestore.data.judges &&
      Object.entries(state.firestore.data.judges).map(([key, value]) => ({
        ...value,
        id: key,
      })),
    judges: state.firestore.data.judges,
  }));

  return { judges, judgesOrdered };
}
