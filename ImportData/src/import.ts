import * as fs from "fs";
import * as admin from "firebase-admin";
// @ts-ignore
import * as serviceAccount from "../../serviceAccount.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://schwan-bewerbung-default-rtdb.firebaseio.com",
  storageBucket: "schwan-bewerbung.appspot.com",
  projectId: "schwan-bewerbung",
});

class Exporter {
  files;
  constructor() {
    this.files = fs.readdirSync("DATA/Documents") as string[];
  }

  uploadFile = async (src: string, destination: string) => {
    try {
      const res = await admin
        .storage()
        .bucket()
        .upload(src, {
          destination: destination,
          gzip: true,
          metadata: {
            cacheControl: "public, max-age=31536000",
          },
        });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  getFile = async (id: string) => {
    try {
      let rawData = await fs.readFileSync("DATA/Documents/" + id + ".json");
      if (!rawData) return;
      // @ts-ignore
      return JSON.parse(rawData);
    } catch (error) {
      // console.log(error);
    }
  };

  exportOne = async (id: string) => {
    const application = await this.getFile(id);

    console.log(application);
  };
}

const exporter = new Exporter();

exporter.exportOne("4880855753772560590");

const run = async () => {
  let files = fs.readdirSync("DATA/Documents");
  let rawData = fs.readFileSync("DATA/Documents/" + files[13]);
  // @ts-ignore
  const data = JSON.parse(rawData);

  const image = data.companyLogo[0];
  const id = data.id;

  console.log(image);

  try {
    const res = await admin
      .storage()
      .bucket()
      .upload(image.src, {
        destination: `${id}/test.jpg`,
        gzip: true,
        metadata: {
          cacheControl: "public, max-age=31536000",
        },
      });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
  try {
    const users = await admin
      .firestore()
      .collection("test")
      .add({ bla: "tttttttt" });

    console.log(users);
  } catch (error) {
    console.log(error);
  }
};
