"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'uploads/files/admin');
    },
    filename: (req, _file, cb) => {
        const filename = req.filename;
        console.log('filename ', filename);
        cb(null, filename);
    }
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload.single('tarifas');
