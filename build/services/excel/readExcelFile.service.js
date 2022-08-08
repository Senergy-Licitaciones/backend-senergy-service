"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readExcelFile = void 0;
const xlsx_1 = __importDefault(require("xlsx"));
const readExcelFile = (filename) => {
    const workbook = xlsx_1.default.readFile(filename);
    return workbook;
};
exports.readExcelFile = readExcelFile;
