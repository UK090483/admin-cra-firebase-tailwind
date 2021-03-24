"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var downLoad_1 = require("./downLoad");
var pdf_image_1 = __importDefault(require("pdf-image"));
var path_1 = require("path");
var PDFImage = pdf_image_1.default.PDFImage;
var fs = __importStar(require("fs"));
var sharp_1 = __importDefault(require("sharp"));
var slugify_1 = __importDefault(require("slugify"));
var MediaHandler = /** @class */ (function () {
    function MediaHandler(url, id, folder) {
        var _this = this;
        this.rootFolder = "DATA/media";
        // result: any[] = [];
        this.original = "";
        this.downloadResult = false;
        this.result = undefined;
        this.getMediaType = function (url) {
            if (url.endsWith("png"))
                return "image";
            if (url.endsWith("pdf"))
                return "pdf";
            if (url.endsWith("jpg"))
                return "image";
            if (url.endsWith("zip"))
                return _this.getMediaType(url.replace(".zip", ""));
            return undefined;
        };
        this.download = function () { return __awaiter(_this, void 0, void 0, function () {
            var downloadSuccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.makeFolder();
                        return [4 /*yield*/, downLoad_1.downloadFile(this.url, this.rootFolder + "/" + this.id + "/" + this.folder + "/", this.fileName)];
                    case 1:
                        downloadSuccess = _a.sent();
                        if (!downloadSuccess) {
                            console.log("error in Application width id: " + this.id);
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, downloadSuccess];
                }
            });
        }); };
        this.makeFolder = function () {
            if (!fs.existsSync(_this.rootFolder + "/" + _this.id + "/" + _this.folder)) {
                fs.mkdir(_this.rootFolder + "/" + _this.id + "/" + _this.folder, { recursive: true }, function (e) {
                    if (e) {
                        console.error(e);
                    }
                });
            }
        };
        this.optimize = function (file) { return __awaiter(_this, void 0, void 0, function () {
            var output, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        output = file.replace(path_1.basename(file), "optimized_" + path_1.basename(file));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, sharp_1.default(file)
                                .resize(1500, undefined, { withoutEnlargement: true })
                                .toFile(output, function (err) {
                                err && console.log(err);
                                try {
                                    fs.unlinkSync(file);
                                }
                                catch (err) {
                                    console.error(err);
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, output];
                    case 3:
                        error_1 = _a.sent();
                        console.error("error in MediaHandler.optimize");
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.convertPDF = function (file) { return __awaiter(_this, void 0, void 0, function () {
            var pdfImage, res, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        pdfImage = new PDFImage(file, {
                            convertOptions: {
                                "-background": "white",
                                "-alpha": "remove",
                                "-flatten": "",
                            },
                        });
                        console.log(pdfImage);
                        return [4 /*yield*/, pdfImage.convertFile()];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2:
                        error_2 = _a.sent();
                        console.log("error in Pdf to Image", error_2);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.handlePdf = function () { return __awaiter(_this, void 0, void 0, function () {
            var downloadSuccess, convertSuccess, optimizeSuccess;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.download()];
                    case 1:
                        downloadSuccess = _a.sent();
                        if (!downloadSuccess)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.convertPDF(downloadSuccess)];
                    case 2:
                        convertSuccess = _a.sent();
                        if (!convertSuccess)
                            return [2 /*return*/];
                        return [4 /*yield*/, Promise.all(convertSuccess.map(function (file) { return _this.optimize(file); }))];
                    case 3:
                        optimizeSuccess = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.handleImage = function () { return __awaiter(_this, void 0, void 0, function () {
            var downloadSuccess, optimizeSuccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.download()];
                    case 1:
                        downloadSuccess = _a.sent();
                        if (!downloadSuccess)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.optimize(downloadSuccess)];
                    case 2:
                        optimizeSuccess = _a.sent();
                        if (!optimizeSuccess)
                            return [2 /*return*/];
                        this.result = { type: "image", src: optimizeSuccess };
                        return [2 /*return*/];
                }
            });
        }); };
        this.prepare = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.type === "pdf")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.handlePdf()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        console.log(this.type);
                        return [2 /*return*/, this.result];
                }
            });
        }); };
        this.url = url;
        this.id = id;
        this.folder = folder + "/" + slugify_1.default(path_1.basename(this.url).replace(path_1.extname(path_1.basename(this.url)), ""));
        this.fileName = path_1.basename(this.url).endsWith(".zip")
            ? path_1.basename(this.url).replace(".zip", "")
            : path_1.basename(this.url);
        this.type = this.getMediaType(url);
    }
    return MediaHandler;
}());
exports.default = MediaHandler;
