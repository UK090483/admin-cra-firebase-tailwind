import { useSelector } from "react-redux";
import firebase from "misc/firebase";
import { RootState } from "redux/store";

import { useFirebase } from "react-redux-firebase";

function useAuth() {
  const firebase = useFirebase();
  const { displayName, email, uid } = useSelector((state: RootState) => ({
    displayName: state.fb.auth.displayName,
    email: state.fb.auth.email,
    uid: state.fb.auth.uid,
  }));

  const signIn = (email: string, password: string) => {
    firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const handleSignOutWithPresence = () => {
    firebase
      .remove(`presence/${uid}`)
      .then(() => {
        firebase.auth().signOut();
      })
      .catch((e) => {
        console.log(e);
        firebase.auth().signOut();
      });
  };

  return {
    email: email,
    displayName: displayName,
    signIn,
    logOut: () => {
      handleSignOutWithPresence();
    },
  };
}

export { useAuth };
