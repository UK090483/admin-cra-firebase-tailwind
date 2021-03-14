import * as admin from "firebase-admin";
import { firestore } from "firebase-functions";

export default firestore
  .document("/judges/{uid}")
  .onCreate(async (snap, context) => {
    const newJudge = { ...snap.data() };

    const { uid } = context.params;

    if (!newJudge.name || !newJudge.email) {
      return;
    }

    try {
      await admin.auth().createUser({
        uid,
        email: newJudge.email,
        displayName: newJudge.name,
        password: "123456",
      });
    } catch (error) {
      console.log("Error creating new user:", error.message);
    }

    // delete newUser.password;

    return snap.ref.set(newJudge);
  });
