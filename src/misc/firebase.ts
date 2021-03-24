import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/firebase-functions";

type fbConfigT = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  databaseURL?: string;
};
const fbConfig: fbConfigT = {
  apiKey: "AIzaSyCD76N3PoRsWo3jlb7xqRhTFv-3JSkz_mY",
  authDomain: "schwan-bewerbung.firebaseapp.com",
  databaseURL: "https://schwan-bewerbung-default-rtdb.firebaseio.com",
  projectId: "schwan-bewerbung",
  storageBucket: "schwan-bewerbung.appspot.com",
  messagingSenderId: "874533489846",
  appId: "1:874533489846:web:f3d5afb8c589b2aa4d6a17",
};

const shouldUseEmulator = window.location.hostname === "localhost";

if (shouldUseEmulator) {
  fbConfig.databaseURL = `http://localhost:9000?ns=${fbConfig.projectId}`;
  console.debug(`Using RTDB emulator: ${fbConfig.databaseURL}`);
}

firebase.initializeApp(fbConfig);

const firestoreSettings: { [k: string]: any } = {};
// Pass long polling setting to Firestore when running in Cypress

// @ts-ignore
if (window.Cypress) {
  // Needed for Firestore support in Cypress (see https://github.com/cypress-io/cypress/issues/6350)
  firestoreSettings.experimentalForceLongPolling = true;
}

if (shouldUseEmulator) {
  firestoreSettings.host = "localhost:8080";
  firestoreSettings.ssl = false;
  console.debug(`Using Firestore emulator: ${firestoreSettings.host}`);

  firebase.firestore().settings(firestoreSettings);
  firebase.functions().useEmulator("localhost", 5001);
}

if (shouldUseEmulator) {
  firebase.auth().useEmulator(`http://localhost:9099/`);
  console.debug(`Using Auth emulator: http://localhost:9099/`);
}

firebase.firestore();

const db = firebase.firestore();

export default firebase;

export { db, firebase };
