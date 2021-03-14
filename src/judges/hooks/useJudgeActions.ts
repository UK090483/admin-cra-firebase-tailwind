import { useDispatch } from "react-redux";
import firebase from "misc/firebase";
import { judgeType } from "judges/JudgeTypes";

interface IAddJudgeProps {
  name: string;
  email: string;
  color: string;
  judgeType: judgeType;
  active: boolean;
}

interface IUpdateJudgeProps {
  name: string;
  email: string;
  color: string;
  id: string;
  judgeType: judgeType;
  active: boolean;
}

export default function useJudgeActions() {
  const dispatch = useDispatch();

  const addJudge = async (props: IAddJudgeProps) => {
    const _createUser = firebase.functions().httpsCallable("createUser");
    try {
      const res = await _createUser({ ...props, type: "judges" });
      return { success: true };
    } catch (error) {
      return { error };
    }
  };
  const updateJudge = async (props: IUpdateJudgeProps) => {
    const _updateUser = firebase.functions().httpsCallable("updateUser");
    try {
      const res = await _updateUser({
        ...props,
        uid: props.id,
        type: "judges",
      });
      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  const eraseJudge = () => {
    // addJudgeAction();
  };

  return { addJudge, eraseJudge, updateJudge };
}
