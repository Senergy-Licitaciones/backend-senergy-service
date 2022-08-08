"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkbook = void 0;
const xlsx_1 = __importDefault(require("xlsx"));
const createWorkbook = () => {
    return xlsx_1.default.utils.book_new();
};
exports.createWorkbook = createWorkbook;
