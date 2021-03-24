// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { attachCustomCommands } from "cypress-firebase";

import { each, omit } from "underscore";

const fbConfig = {
  apiKey: "AIzaSyCD76N3PoRsWo3jlb7xqRhTFv-3JSkz_mY",
  authDomain: "schwan-bewerbung.firebaseapp.com",
  databaseURL: "https://schwan-bewerbung-default-rtdb.firebaseio.com",
  projectId: "schwan-bewerbung",
  storageBucket: "schwan-bewerbung.appspot.com",
  messagingSenderId: "874533489846",
  appId: "1:874533489846:web:f3d5afb8c589b2aa4d6a17",
};

// const rtdbEmulatorHost = Cypress.env("FIREBASE_DATABASE_EMULATOR_HOST");
// if (rtdbEmulatorHost) {
//   fbConfig.databaseURL = `http://${rtdbEmulatorHost}?ns=${fbConfig.projectId}`;
// }

firebase.initializeApp(fbConfig);

// const firestoreEmulatorHost = Cypress.env("FIRESTORE_EMULATOR_HOST");
// if (firestoreEmulatorHost) {
//   firebase.firestore().settings({
//     host: firestoreEmulatorHost,
//     ssl: false,
//   });
// }

// const firestoreEmulatorHost = `localhost:8080`;
// if (firestoreEmulatorHost) {
//   firebase.firestore().settings({
//     host: firestoreEmulatorHost,
//     ssl: false,
//   });
// }

// const authEmulatorHost = `localhost:9099`;
// if (authEmulatorHost) {
//   firebase.auth().useEmulator(`http://${authEmulatorHost}/`);
//   console.debug(`Using Auth emulator: http://${authEmulatorHost}/`);
//}

Cypress.Commands.add("navigate", (path) => {
  cy.visit(`localhost:3000/${path ? path : ""}`);
});

Cypress.Commands.add("bla", (path) => {
  cy.visit(`localhost:3000/${path ? path : ""}`);
});

Cypress.Commands.add("clearFireStore", () => {
  cy.callFirestore("get", "tableDoc/first").then((data) => {
    const cleanData = {};

    Object.entries(data).forEach(([key, item]) => {
      cleanData[key] = omit(item, "assessments");
    });

    cy.callFirestore("set", "tableDoc/first", cleanData);
  });
});

attachCustomCommands({ Cypress, cy, firebase });
