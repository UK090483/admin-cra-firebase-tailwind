import { https } from "firebase-functions";
import { auth, firestore } from "firebase-admin";

export default https.onCall(async (data) => {
  const { uid, type } = data;

  if (!uid && !type) {
    console.log("uid or type is missing");
    return;
  }

  try {
    await auth().deleteUser(uid);
  } catch (error) {
    throw new https.HttpsError("invalid-argument", error.code);
  }

  try {
    await firestore().collection(type).doc(uid).delete();
  } catch (error) {}

  return { uid };
});
