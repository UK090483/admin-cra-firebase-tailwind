import * as https from "https";
import * as fs from "fs";

const dir = "DATA";
const LIVE = true;

const getDataAll = () => {
  return new Promise((resolve, reject) => {
    https
      .get(
        `https://eu-api.jotform.com/form/203272222735044/submissions?limit=500&apiKey=${process.env.JOTFORMKEY}`,
        (resp) => {
          let data = "";

          resp.on("data", (chunk) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on("end", () => {
            resolve(JSON.parse(data));
          });
        }
      )
      .on("error", (err) => {
        reject(err.message);
      });
  });
};

const getDataFromJotForm = async (live: boolean) => {
  let data: any;

  if (live) {
    console.log("Fetching JotFormAPI");
    data = await getDataAll();
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    fs.writeFileSync("DATA/ApiResponse.json", JSON.stringify(data));
    console.log(data.content.length);
    return data;
  }

  const JSONData = await fs.readFileSync("DATA/ApiResponse.json");
  // @ts-ignore
  data = JSON.parse(JSONData);

  console.log("Using Old JotFormAPI Data");

  return data;
};

export { getDataFromJotForm };
