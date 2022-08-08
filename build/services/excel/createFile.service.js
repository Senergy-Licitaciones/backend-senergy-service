"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = void 0;
const xlsx_1 = __importDefault(require("xlsx"));
const createFile = (book, name) => {
    return xlsx_1.default.writeFile(book, name);
};
exports.createFile = createFile;
