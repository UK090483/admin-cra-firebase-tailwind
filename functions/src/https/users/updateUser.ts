import { https } from "firebase-functions";
import { auth, firestore } from "firebase-admin";

const updateUserAuth = async (
  uid: string,
  email: string,
  admin: boolean,
  write: boolean,
  disabled: boolean
) => {
  await auth().updateUser(uid, {
    email,
    password: "F123456",
    disabled,
  });

  await auth().setCustomUserClaims(uid, {
    admin: admin ? true : false,
    write: write ? true : false,
  });

  return uid;
};

export default https.onCall(async (data) => {
  const { email, admin, type, active, write, uid } = data;

  if (!email) {
    throw new https.HttpsError("invalid-argument", "auth/invalid-email");
  }

  try {
    await updateUserAuth(uid, email, admin, write, !active);
  } catch (error) {
    throw new https.HttpsError("invalid-argument", error.code);
  }

  await firestore()
    .collection(type)
    .doc(uid)
    .set({ ...data });

  return { uid };
});
