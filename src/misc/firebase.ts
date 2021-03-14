import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/firebase-functions";

const fbConfig = {
  apiKey: "AIzaSyCD76N3PoRsWo3jlb7xqRhTFv-3JSkz_mY",
  authDomain: "schwan-bewerbung.firebaseapp.com",
  projectId: "schwan-bewerbung",
  storageBucket: "schwan-bewerbung.appspot.com",
  messagingSenderId: "874533489846",
  appId: "1:874533489846:web:f3d5afb8c589b2aa4d6a17",
};

var fbConfigNext = {
  apiKey: "AIzaSyANN44GYDTw1ZkF3vPYACccyRGb1rGEJBY",
  authDomain: "futurehamburgaward-8af63.firebaseapp.com",
  projectId: "futurehamburgaward-8af63",
  storageBucket: "futurehamburgaward-8af63.appspot.com",
  messagingSenderId: "717511540147",
  appId: "1:717511540147:web:ba6f9f5372c4ee0cc49fc6",
};

firebase.initializeApp(fbConfig);
firebase.firestore();

const db = firebase.firestore();
// eslint-disable-next-line no-restricted-globals

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  db.useEmulator("localhost", 8080);
  firebase.auth().useEmulator("http://localhost:9099/");
  firebase.functions().useEmulator("localhost", 5001);
  firebase.database().useEmulator("localhost", 9000);
}

export default firebase;

export { db, firebase };
