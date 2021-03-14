import * as admin from "firebase-admin";
import { firestore } from "firebase-functions";

export default firestore
  .document("/users/{uid}")
  .onCreate(async (snap, context) => {
    const newUser = { ...snap.data() };

    const { uid } = context.params;

    if (!newUser.name || !newUser.email) {
      return;
    }

    try {
      await admin.auth().createUser({
        uid,
        email: newUser.email,
        displayName: newUser.name,
        password: newUser.password,
      });

      if (newUser.isAdmin) {
        await admin.auth().setCustomUserClaims(uid, { admin: true });
      }
    } catch (error) {
      console.log("Error creating new user:", error.message);
    }

    delete newUser.password;

    return snap.ref.set(newUser);
  });
