import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { RootState } from "redux/store";

function useAuth() {
  const firebase = useFirebase();
  const { displayName, email, uid, isEmpty, isAdmin, authLoaded } = useSelector(
    (state: RootState) => ({
      isEmpty: state.fb.auth.isEmpty,
      isAdmin: state.fb.profile.token?.claims.admin,
      authLoaded: state.fb.profile.isLoaded,
      displayName: state.fb.auth.displayName,
      email: state.fb.auth.email,
      uid: state.fb.auth.uid,
    })
  );

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
    authLoaded,
    isAdmin,
    isEmpty,
    email: email,
    displayName: displayName,
    signIn,
    logOut: () => {
      handleSignOutWithPresence();
    },
  };
}

export { useAuth };
