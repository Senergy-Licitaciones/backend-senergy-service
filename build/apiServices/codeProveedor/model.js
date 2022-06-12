"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const codeProveedorSchema = new mongoose_1.default.Schema({
    code: {
        type: String,
        length: 6,
        required: true,
        trim: true,
        unique: true
    },
    proveedor: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    expiredTime: {
        type: Date,
        expires: 300
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.default = mongoose_1.default.model('CodeProveedorModel', codeProveedorSchema);
