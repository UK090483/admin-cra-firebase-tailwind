import * as fs from "fs";
import { config } from "dotenv";
import DataImporter from "./lib/DataImporter";
config();

const Importer = new DataImporter(false);

Importer.getOne("4880855753772560590", true);

// Importer.getAll(true);
