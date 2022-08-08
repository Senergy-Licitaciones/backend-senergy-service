"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWorksheetToBook = void 0;
const xlsx_1 = __importDefault(require("xlsx"));
const addWorksheetToBook = (book, worksheet, name) => {
    return xlsx_1.default.utils.book_append_sheet(book, worksheet, name);
};
exports.addWorksheetToBook = addWorksheetToBook;
