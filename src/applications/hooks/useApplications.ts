import { shallowEqual, useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import { RootState } from "redux/Reducers/RootReducer";

interface IUseApplicationReturn {
  data: { [k: string]: any } | undefined;
  ordered: any[] | undefined;
  isLoaded: boolean;
}

export default function useApplications(): IUseApplicationReturn {
  const { ordered, data } = useSelector(
    (state: RootState) => ({
      data:
        state.firestore.data.tableDoc?.first &&
        state.firestore.data.tableDoc.first,

      ordered:
        state.firestore.data.tableDoc?.first &&
        Object.entries(
          state.firestore.data.tableDoc.first // @ts-ignore
        ).map(([key, value]) => ({ ...value, id: key })),
    }),
    shallowEqual
  );

  return {
    data,
    ordered,
    isLoaded: isLoaded({ collection: "tableDoc", doc: "first" }),
  };
}
