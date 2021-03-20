import { useSelector } from "react-redux";
import { RootState } from "redux/Reducers/RootReducer";

export default function useJudges() {
  const { judgesOrdered, judges, judgeAverages } = useSelector(
    (state: RootState) => ({
      judgesOrdered:
        state.firestore.data.judges &&
        Object.entries(state.firestore.data.judges).map(([key, value]) => ({
          ...value,
          id: key,
        })),
      judges: state.firestore.data.judges,
      judgeAverages: state.assessments.judgeAverages,
    })
  );

  return { judges, judgesOrdered, judgeAverages };
}
