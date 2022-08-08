"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsonFromSheet = void 0;
const xlsx_1 = __importDefault(require("xlsx"));
const getJsonFromSheet = (sheet) => {
    return xlsx_1.default.utils.sheet_to_json(sheet);
};
exports.getJsonFromSheet = getJsonFromSheet;
