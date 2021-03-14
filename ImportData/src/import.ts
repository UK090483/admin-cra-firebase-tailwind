import * as fs from "fs";
import * as admin from "firebase-admin";

admin.initializeApp({ projectId: "schwan-bewerbung" });

const run = async () => {
  try {
    // const users = await admin.firestore().collection("applications").get();
    console.log(admin.firestore().collection("applications").get());
  } catch (error) {
    console.log(error);
  }

  fs.readdir("DATA/Documents", (err, files) => {
    files.forEach((file) => {
      console.log(file);
    });
  });
};

run();
