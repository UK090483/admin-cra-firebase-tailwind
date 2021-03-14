import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { RootState } from "redux/Reducers/RootReducer";

export default function useUsers() {
  useFirestoreConnect([{ collection: "users" }]);
  const users = useSelector((state: RootState) => state.firestore.data.users);
  return { users };
}
