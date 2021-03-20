import * as fs from "fs";
import * as https from "https";

import mkdirp from "mkdirp";

const getDownloadUrl = async (url: string) => {
  return new Promise((resolve, reject) => {
    const urlWithKey = `${url}?apiKey=${process.env.JOTFORMKEY}`;
    https.get(urlWithKey, (response) => {
      if (response.headers.location) {
        resolve(response.headers.location);
      }
    });
  });
};

const downloadData = (url: string, filePath: string, fileName: string) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath + fileName);
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

const downloadFile = async (
  url: string,
  filePath: string,
  fileName: string
) => {
  const downloadUrl = await getDownloadUrl(url);

  await mkdirp(filePath);

  if (downloadUrl && typeof downloadUrl === "string") {
    await downloadData(downloadUrl, filePath, fileName);
  }
};

export { downloadFile };
