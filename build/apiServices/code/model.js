"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const codeSchema = new mongoose_1.default.Schema({
    code: {
        type: String,
        length: 6,
        unique: true,
        required: true
    },
    expiredTime: {
        type: Date,
        expires: 300
    },
    user: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.default = mongoose_1.default.model("CodeModel", codeSchema);
