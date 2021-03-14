import * as functions from "firebase-functions";
import { parseJotFormData } from "../helper/jotFormDataMaper";
import { firestore } from "firebase-admin";

import * as fs from "fs";

// import * as https from "https";
// import { handleData } from "../helper/handleData";

export default functions
  .runWith({ timeoutSeconds: 540, memory: "1GB" })
  .https.onRequest(async (request, response) => {
    // const data: any = await getDataFromJotform();

    // await fs.writeFileSync("testResponse.json", JSON.stringify(data));

    const testData = await fs.readFileSync("testResponse.json");
    // @ts-ignore
    const data: any = JSON.parse(testData);

    let res: any[] = [];

    if (data) {
      let batch = firestore().batch();

      if (data.content) {
        for (let application of data.content) {
          let parsedData = parseJotFormData(application);

          // parsedData = await handleImages(parsedData);

          res.push(parsedData);
          const ref = firestore()
            .collection("applications")
            .doc(application.id);
          batch.set(ref, parsedData);
        }
      }
      try {
        await batch.commit();
      } catch (error) {}
    }

    response.send(res);
  });

// const handleImages = async (application: any) => {
//   if (application.companyLogo && application.companyLogo.length > 0) {
//     for (let logo of application.companyLogo) {
//       // console.log("companyLogo needs upload " + logo);

//       await handleData(logo, application.id, "logo");
//     }
//   }

//   if (application.companyDeck && application.companyDeck.length > 0) {
//     for (let deck of application.companyDeck) {
//       // console.log("companyDeck needs upload " + deck);

//       await handleData(deck, application.id, "deck");
//     }
//   }

//   // handleData

//   return application;
// };

// const getDataFromJotform = () => {
//   return new Promise((resolve, reject) => {
//     https
//       .get(
//         `https://eu-api.jotform.com/form/203272222735044/submissions?limit=500&apiKey=${
//           functions.config().jotform.key
//         }`,
//         (resp) => {
//           let data = "";

//           resp.on("data", (chunk) => {
//             data += chunk;
//           });

//           // The whole response has been received. Print out the result.
//           resp.on("end", () => {
//             resolve(JSON.parse(data));
//           });
//         }
//       )
//       .on("error", (err) => {
//         reject(err.message);
//       });
//   });
// };
