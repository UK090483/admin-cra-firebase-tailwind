import { https } from "firebase-functions";
import { firestore } from "firebase-admin";

export default https.onCall(async (data, context) => {
  const { auth } = context;
  if (!auth) {
    return;
  }

  const applications = await firestore()
    .collection("applications")
    .where(`assessments.${auth.uid}`, "!=", "true")
    .get();

  const cleaned = applications.docs.map((application) => ({
    ...application.data(),
    assessments: filter(application.data(), auth.uid),
    id: application.id,
  }));

  return cleaned;
});

const filter = (application: any, id: string) => {
  if (!application.assessments) {
    return {};
  }

  return Object.entries(application.assessments).reduce(
    (acc, [key, value]) => ({ ...acc, ...(key === id && { [key]: value }) }),
    {}
  );
};
