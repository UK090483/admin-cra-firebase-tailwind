import * as fs from "fs";
import * as https from "https";
// import { storage } from "firebase-admin";
import * as functions from "firebase-functions";
import * as path from "path";

const dir = "images";

const handleData = async (url: string, destination: string, type: string) => {
  return new Promise((resolve, reject) => {
    let fileName = path.basename(new URL(url).pathname);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const folder = `${dir}/${destination}`;
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    const typeFolder = `${folder}/${type}`;

    if (!fs.existsSync(typeFolder)) {
      fs.mkdirSync(typeFolder);
    }

    let filePath = `${typeFolder}/${fileName}`;

    const urlWithKey = `${url}?apiKey=${functions.config().jotform.key}`;

    https.get(urlWithKey, (response) => {
      if (response.headers.location) {
        loadData(response.headers.location, filePath).then((info) =>
          resolve(info)
        );
      }
    });

    // loadData(urlWithKey, filePath).then(() => resolve(true));
  });

  //   await storage()
  //     .bucket("gs://schwan-bewerbung.appspot.com")
  //     .upload(fileName, {
  //       // By setting the option `destination`, you can change the name of the
  //       destination: destination,
  //       // object you are uploading to a bucket.
  //       metadata: {
  //         // Enable long-lived HTTP caching headers
  //         // Use only if the contents of the file will never change
  //         // (If the contents will change, use cacheControl: 'no-cache')
  //         cacheControl: "public, max-age=31536000",
  //       },
  //     });
};

const loadData = (url: string, filePath: string) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    let fileInfo: any = null;

    const request = https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }

      fileInfo = {
        mime: response.headers["content-type"],
      };

      response.pipe(file);
      request.on("error", (err) => {
        fs.unlink(filePath, () => reject(err));
      });
    });

    file.on("finish", () => resolve(fileInfo));

    request.on("error", (err) => {
      fs.unlink(filePath, () => reject(err));
    });

    file.on("error", (err) => {
      fs.unlink(filePath, () => reject(err));
    });

    request.end();
  });
};

export { handleData };
