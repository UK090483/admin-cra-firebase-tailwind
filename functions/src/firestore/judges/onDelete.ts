import { auth } from "firebase-admin";
import { firestore } from "firebase-functions";

export default firestore
  .document("judges/{uid}")
  .onDelete((snapshot, context) => {
    const { uid } = context.params;
    return auth().deleteUser(uid);
  });
