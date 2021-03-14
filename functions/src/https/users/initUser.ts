import { https } from "firebase-functions";
import { auth } from "firebase-admin";

export default https.onRequest(async (req, res) => {
  const { uid } = await auth().getUserByEmail("web@konradullrich.com");

  await auth().setCustomUserClaims(uid, {
    admin: true,
    write: true,
  });

  res.status(200).send(uid);
});
