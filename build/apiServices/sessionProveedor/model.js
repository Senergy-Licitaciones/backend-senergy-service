"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enums_1 = require("../../types/data/enums");
const sessionProveedorSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        enum: enums_1.Type,
        default: enums_1.Type.Proveedor,
        required: true
    },
    jwt: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    proveedor: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    expireAt: {
        type: Date,
        default: new Date(new Date().valueOf() + 3600000),
        expires: 120
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.default = mongoose_1.default.model("SessionProveedorModel", sessionProveedorSchema);
