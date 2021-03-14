import { useDispatch } from "react-redux";
import firebase from "misc/firebase";

interface ICreateUserProps {
  name: string;
  isAdmin?: boolean;
  email: string;
}
interface IUpdateUserProps {
  name: string;
  admin?: boolean;
  active?: boolean;
  write?: boolean;
  email: string;
  uid: string;
}

interface IDeleteUserProps {
  id: string;
}

export default function useJudgeActions() {
  const createUser = async (props: ICreateUserProps) => {
    const _createUser = firebase.functions().httpsCallable("createUser");
    try {
      const res = await _createUser({ ...props, type: "users" });
      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  const updateUser = async (props: IUpdateUserProps) => {
    const _updateUser = firebase.functions().httpsCallable("updateUser");
    try {
      const res = await _updateUser({ ...props, type: "users" });
      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  const deleteUser = async (props: IDeleteUserProps) => {
    const _deleteUser = firebase.functions().httpsCallable("deleteUser");
    try {
      const res = await _deleteUser(props);
      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  return { createUser, updateUser, deleteUser };
}
