"use strict";
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
exports.handleMedia = void 0;
var MediaHandler_1 = __importDefault(require("./MediaHandler"));
var handleMedia = function (application) { return __awaiter(void 0, void 0, void 0, function () {
    var DECK, _i, _a, deck, item, mediaItem, LOGO, _b, _c, logo, item, mediaItem;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                DECK = [];
                _i = 0, _a = application.companyDeck;
                _d.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                deck = _a[_i];
                item = new MediaHandler_1.default(deck, application.id, "deck");
                return [4 /*yield*/, item.prepare()];
            case 2:
                mediaItem = _d.sent();
                DECK.push(mediaItem);
                _d.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                LOGO = [];
                if (!(application.companyLogo && application.companyLogo.length > 0)) return [3 /*break*/, 8];
                _b = 0, _c = application.companyLogo;
                _d.label = 5;
            case 5:
                if (!(_b < _c.length)) return [3 /*break*/, 8];
                logo = _c[_b];
                item = new MediaHandler_1.default(logo, application.id, "logo");
                return [4 /*yield*/, item.prepare()];
            case 6:
                mediaItem = _d.sent();
                LOGO.push(mediaItem);
                _d.label = 7;
            case 7:
                _b++;
                return [3 /*break*/, 5];
            case 8:
                application.companyDeck = DECK;
                application.companyLogo = LOGO;
                return [2 /*return*/, application];
        }
    });
}); };
exports.handleMedia = handleMedia;
