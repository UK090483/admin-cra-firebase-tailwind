import { https } from "firebase-functions";
import { auth, firestore } from "firebase-admin";

const createUserAuth = async (
  email: string,
  admin: boolean,
  write: boolean,
  disabled: boolean
) => {
  const { uid } = await auth().createUser({
    email,
    password: "F123456",
    disabled,
  });

  await auth().setCustomUserClaims(uid, {
    admin,
    write,
  });

  return uid;
};

export default https.onCall(async (data) => {
  const { email, isAdmin, type, active, write } = data;

  if (!email) {
    throw new https.HttpsError("invalid-argument", "auth/invalid-email");
  }

  let uid;
  try {
    uid = await createUserAuth(email, isAdmin, write, !active);
  } catch (error) {
    throw new https.HttpsError("invalid-argument", error.code);
  }

  await firestore()
    .collection(type)
    .doc(uid)
    .set({ ...data, id: uid });

  return { uid };
});
