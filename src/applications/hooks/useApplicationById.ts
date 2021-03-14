import { useSelector } from "react-redux";
import { RootState } from "../../redux/Reducers/RootReducer";
import { selectApplicationById } from "../state/applicationSelectors";

const useApplicationById = (id: string) => {
  const application = useSelector((state: RootState) =>
    selectApplicationById(state, id)
  );

  return application;
};

export default useApplicationById;
