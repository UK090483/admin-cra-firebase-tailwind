import { downloadFile } from "./downLoad";
import PDF_Image from "pdf-image";
import { basename, extname } from "path";
const PDFImage = PDF_Image.PDFImage;
import * as fs from "fs";
import sharp from "sharp";
import slugify from "slugify";

type mediaType = "image" | "pdf" | undefined;

interface MediaItem {
  type: mediaType;
}

export type IMediaItemImage = { type: "image"; src: string };

export type IMediaItemPdf = { type: "pdf"; pdfAsImages: string[]; src: string };

class MediaHandler {
  rootFolder = `DATA/media`;
  url: string;
  fileName: string;
  folder: string;
  id: string;
  type: mediaType;
  localUrl: string[] | undefined;
  // result: any[] = [];
  original: string = "";
  downloadResult: string | false = false;

  result: IMediaItemImage | IMediaItemPdf | undefined = undefined;

  constructor(url: string, id: string, folder: string) {
    this.url = url;
    this.id = id;
    this.folder = `${folder}/${slugify(
      basename(this.url).replace(extname(basename(this.url)), "")
    )}`;
    this.fileName = basename(this.url).endsWith(".zip")
      ? basename(this.url).replace(".zip", "")
      : basename(this.url);
    this.type = this.getMediaType(url);
  }

  getMediaType = (url: string): mediaType => {
    if (url.endsWith("png")) return "image";
    if (url.endsWith("pdf")) return "pdf";
    if (url.endsWith("jpg")) return "image";
    if (url.endsWith("zip")) return this.getMediaType(url.replace(".zip", ""));
    return undefined;
  };

  download = async () => {
    this.makeFolder();

    const downloadSuccess = await downloadFile(
      this.url,
      `${this.rootFolder}/${this.id}/${this.folder}/`,
      this.fileName
    );

    if (!downloadSuccess) {
      console.log("error in Application width id: " + this.id);
      return false;
    }
    return downloadSuccess;
  };

  private makeFolder = () => {
    if (!fs.existsSync(`${this.rootFolder}/${this.id}/${this.folder}`)) {
      fs.mkdir(
        `${this.rootFolder}/${this.id}/${this.folder}`,
        { recursive: true },
        (e) => {
          if (e) {
            console.error(e);
          }
        }
      );
    }
  };

  optimize = async (file: string) => {
    const output = file.replace(basename(file), `optimized_${basename(file)}`);

    try {
      await sharp(file)
        .resize(1500, undefined, { withoutEnlargement: true })
        .toFile(output, function (err: any) {
          err && console.log(err);
          try {
            fs.unlinkSync(file);
          } catch (err) {
            console.error(err);
          }
        });
      return output;
    } catch (error) {
      console.error("error in MediaHandler.optimize");
      return false;
    }
  };

  convertPDF = async (file: string) => {
    try {
      const pdfImage = new PDFImage(file, {
        convertOptions: {
          "-background": "white",
          "-alpha": "remove",
          "-flatten": "",
        },
      });

      console.log(pdfImage);
      const res = await pdfImage.convertFile();
      return res;
    } catch (error) {
      console.log("error in Pdf to Image", error);
      return false;
    }
  };

  handlePdf = async () => {
    const downloadSuccess = await this.download();
    if (!downloadSuccess) return;
    const convertSuccess = await this.convertPDF(downloadSuccess);
    if (!convertSuccess) return;
    const optimizeSuccess = await Promise.all(
      convertSuccess.map((file) => this.optimize(file))
    );
  };

  handleImage = async () => {
    const downloadSuccess = await this.download();
    if (!downloadSuccess) return;
    const optimizeSuccess = await this.optimize(downloadSuccess);
    if (!optimizeSuccess) return;
    this.result = { type: "image", src: optimizeSuccess };
  };

  prepare = async () => {
    // if (this.type === "image") {
    //   await this.handleImage();
    // }

    if (this.type === "pdf") {
      await this.handlePdf();
    }

    console.log(this.type);

    return this.result;
  };
}

export default MediaHandler;
