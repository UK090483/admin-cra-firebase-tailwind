import { https } from "firebase-functions";
import { firestore } from "firebase-admin";

export default https.onCall(async (data, context) => {
  const { applicationId, nextAssessments } = data;

  const { auth } = context;
  if (!auth) {
    return;
  }

  const applications = await firestore()
    .collection("applications")
    .doc(applicationId)
    .update({
      [`assessments.${auth.uid}`]: nextAssessments[auth.uid],
      updated_at: firestore.Timestamp.now(),
    });

  return applications;
});
