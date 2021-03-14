import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/Reducers/RootReducer";
import { useFirestoreConnect } from "react-redux-firebase";
import { IJudgeRecord } from "../JudgeTypes";
import { IJudgeState } from "../state/judgesReducer";

export default function useJudges() {
  useFirestoreConnect([{ collection: "judges" }]);
  const judges = useSelector((state: RootState) => state.firestore.data.judges);
  const judgesOrdered: IJudgeRecord[] = useSelector((state: RootState) =>
    state.firestore.data.judges
      ? Object.entries(
          state.firestore.data.judges as IJudgeState
        ).map(([key, value]) => ({ ...value, id: key }))
      : []
  );

  return { judges, judgesOrdered };
}
