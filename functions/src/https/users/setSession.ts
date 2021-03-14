import { https } from "firebase-functions";
import { firestore } from "firebase-admin";

export default https.onCall(async (data, context) => {
  const { auth } = context;
  const { online } = data;

  // console.log("-------------------------------------------");

  // console.log(auth);
  // console.log(data);

  if (auth && !auth?.token.admin) {
    await firestore()
      .collection("judges")
      .doc(auth.uid)
      .update({ online: online });
  }

  return "bla";
});
