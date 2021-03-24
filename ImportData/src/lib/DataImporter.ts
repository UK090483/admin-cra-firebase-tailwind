import * as fs from "fs";
import { getDataFromJotForm } from "./getDataFromJotForm";
import { handleMedia } from "./handleMedia";
import { parseJotFormData } from "./jotFormDataMaper";

class DataImporter {
  live;
  overWrite;

  constructor(live: boolean, overWrite?: boolean) {
    this.live = live;
    this.overWrite = !!overWrite;
  }
  private getData = async () => {
    const res = await getDataFromJotForm(this.live);
    return res.content as any[];
  };

  private createRootFolder = () => {
    if (!fs.existsSync("DATA/Documents")) {
      fs.mkdirSync("DATA/Documents");
    }
  };

  private fileExist = (id: string | number): boolean => {
    return fs.existsSync(`DATA/Documents/${id}.json`);
  };

  private handleDocument = async (application: any) => {
    if (!this.overWrite && this.fileExist(application.id)) {
      console.log(`application ${application.id} Exists`);
      return;
    }

    const clear = await handleMedia(parseJotFormData(application));
    fs.writeFileSync(`DATA/Documents/${clear.id}.json`, JSON.stringify(clear));
  };

  private handleDocuments = async (applications: any) => {
    for (let application of applications) {
      await this.handleDocument(application);
    }
  };

  getOne = async (id: string | number, overWrite?: boolean) => {
    this.overWrite = !!overWrite;
    this.createRootFolder();
    const data = await this.getData();
    const dataItem = data.filter((item) => item.id === id)[0];
    if (!dataItem) console.log("impossible to find application with id: " + id);
    await this.handleDocument(dataItem);
  };

  getAll = async (overWrite?: boolean) => {
    this.overWrite = !!overWrite;
    this.createRootFolder();
    const data = await this.getData();
    await this.handleDocuments(data);
  };
}

export default DataImporter;
