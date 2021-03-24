import * as fs from "fs";
import * as https from "https";
import unzip from "unzip-stream";

import mkdirp from "mkdirp";

const getDownloadUrl = async (url: string): Promise<string | false> => {
  return new Promise((resolve, reject) => {
    const urlWithKey = `${url}?apiKey=${process.env.JOTFORMKEY}`;

    try {
      https.get(urlWithKey, (response) => {
        if (response.headers.location) {
          const encoded = encodeURI(response.headers.location).replace(
            "%C3%83%C2%9F",
            "ß"
          );

          const decoded = decodeURI(encoded);

          resolve(decoded);
        }
      });
    } catch (error) {
      console.log("problem with getting DownloadUrl");
      console.log(error);
      reject(false);
    }
  });
};

const downloadData = (
  url: string,
  filePath: string,
  fileName: string
): Promise<string | false> => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath + fileName);

    let fileInfo: any = null;

    const request = https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(false);
        return;
      }

      fileInfo = {
        mime: response.headers["content-type"],
      };

      response.pipe(file);

      request.on("error", (err) => {
        fs.unlink(filePath, () => reject(false));
      });
    });

    file.on("finish", () => {
      resolve(filePath + fileName);
    });

    request.on("error", (err) => {
      fs.unlink(filePath, () => reject(false));
    });

    file.on("error", (err) => {
      fs.unlink(filePath, () => reject(false));
    });

    request.end();
  });
};

const unZipFile = (
  filePath: string,
  fileName: string
): Promise<string | false> => {
  return new Promise((resolve, reject) => {
    const file = fs.createReadStream(filePath + fileName).pipe(unzip.Parse());

    file.on("entry", function (entry) {
      const OutFilePath = entry.path;
      const withoutZip = fileName.replace(".zip", "");
      const shouldUnzip = OutFilePath.split("/").length === 1;

      if (shouldUnzip) {
        const writeFile = fs.createWriteStream(filePath + withoutZip);
        entry.pipe(writeFile);

        writeFile.on("finish", () => {
          resolve(filePath + withoutZip);
        });
        writeFile.on("error", (err) => {
          console.log(err);
          resolve(false);
        });
      } else {
        entry.autodrain();
      }
    });
  });
};

const downloadFile = async (
  url: string,
  filePath: string,
  fileName: string
): Promise<string | false> => {
  const isZip = fileName.endsWith(".zip");
  let downloadUrl = await getDownloadUrl(url);
  if (!downloadUrl) return false;

  await mkdirp(filePath);

  let filepath = await downloadData(downloadUrl, filePath, fileName);

  if (isZip) {
    filepath = await unZipFile(filePath, fileName);
  }

  return filepath;
};

export { downloadFile };
