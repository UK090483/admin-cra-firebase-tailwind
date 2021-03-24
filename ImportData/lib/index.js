"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var DataImporter_1 = __importDefault(require("./lib/DataImporter"));
dotenv_1.config();
var Importer = new DataImporter_1.default(false);
Importer.getOne("4880855753772560590", true);
// Importer.getAll(true);
