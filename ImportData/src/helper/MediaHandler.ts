import { downloadFile } from "./downLoad";
import PDF_Image from "pdf-image";
import { basename, extname } from "path";
const PDFImage = PDF_Image.PDFImage;
import * as fs from "fs";
import sharp from "sharp";
import slugify from "slugify";

type mediaType = "png" | "pdf" | "jpg" | undefined;

interface MediaItem {
  type: mediaType;
}

class MediaHandler {
  rootFolder = `DATA/media`;
  url: string;
  fileName: string;
  folder: string;
  id: string;
  type: mediaType;
  localUrl: string[] | undefined;
  result: any[] = [];
  original: string = "";

  constructor(url: string, id: string, folder: string) {
    this.url = url;
    this.id = id;
    this.folder = `${folder}/${slugify(
      basename(this.url).replace(extname(basename(this.url)), "")
    )}`;
    this.fileName = basename(this.url);
    this.type = this.getMediaType(url);
  }

  getMediaType = (url: string): mediaType => {
    if (url.endsWith("png")) return "png";
    if (url.endsWith("pdf")) return "pdf";
    if (url.endsWith("jpg")) return "jpg";
    return undefined;
  };

  download = async () => {
    console.log(`start Download ${this.fileName}`);

    this.makeFolder();

    await downloadFile(
      this.url,
      `${this.rootFolder}/${this.id}/${this.folder}/`,
      this.fileName
    );

    this.localUrl =
      this.type !== "pdf"
        ? [`${this.rootFolder}/${this.id}/${this.folder}/${this.fileName}`]
        : undefined;

    if (this.type === "pdf") {
      this.original = `${this.rootFolder}/${this.id}/${this.folder}/${this.fileName}`;
    }

    console.log(`Download ${this.fileName} Done`);

    return `${this.rootFolder}/${this.id}/${this.folder}/${this.fileName}`;
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

  optimize = async (file?: string) => {
    const files = file ? [file] : this.localUrl;
    if (!files) {
      console.log("no files To Optimize");
      return;
    }

    const result: any[] = [];
    for (let file of files) {
      const output = file.replace(
        basename(file),
        `optimized_${basename(file)}`
      );

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

      result.push(output);
    }
    this.result = result;
  };

  handlePDF = async () => {
    try {
      var pdfImage = new PDFImage(
        `${this.rootFolder}/${this.id}/${this.folder}/${this.fileName}`,
        {
          convertOptions: {
            "-background": "white",
            "-alpha": "remove",
            "-flatten": "",
          },
        }
      );

      this.localUrl = await pdfImage.convertFile();
    } catch (error) {
      console.log(error);
    }
  };

  prepare = async () => {
    await this.download();

    if (this.type === "pdf") {
      await this.handlePDF();
    }

    await this.optimize();

    if (this.type === "pdf") {
      return { type: this.type, src: this.result, original: this.original };
    }

    return { type: this.type, src: this.result[0] };
  };
}

export default MediaHandler;
