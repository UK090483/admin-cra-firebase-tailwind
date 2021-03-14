import { useSelector } from "react-redux";
import { firebase } from "misc/firebase";
import { RootState } from "redux/store";
import { useEffect, useState } from "react";

function useSession() {
  useEffect(() => {
    window.addEventListener("beforeunload", (ev) => {
      firebase.functions().httpsCallable("setSession")({ online: false });
    });
  }, []);
}

export { useSession };
