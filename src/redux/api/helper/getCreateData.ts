import firebase from "misc/firebase";

const getCreateData = () => {
  return {
    updated_at: firebase.firestore.Timestamp.now(),
    updated_by: "blaaaaaaaaaaaaaaaaa",
  };
};
export default getCreateData;
