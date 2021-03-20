import * as fs from "fs";
import { config } from "dotenv";
config();

import { getDataFromJotform } from "./lib/getDataFromJotForm";
import { handleMedia } from "./lib/handleMedia";
import { parseJotFormData } from "./lib/jotFormDataMaper";

const run = async () => {
  const res: any = await getDataFromJotform();

  if (!fs.existsSync("DATA/Documents")) {
    fs.mkdirSync("DATA/Documents");
  }

  if (res && res.content) {
    for (let application of res.content) {
      try {
        if (fs.existsSync(`DATA/Documents/${application.id}.json`)) {
        } else {
          const clear = await handleMedia(parseJotFormData(application));
          fs.writeFileSync(
            `DATA/Documents/${clear.id}.json`,
            JSON.stringify(clear)
          );
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
};

run();
