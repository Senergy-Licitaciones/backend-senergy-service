"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sessionProveedorSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        enum: ["proveedor"],
        default: "proveedor",
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
    expiredAt: {
        type: Date,
        default: new Date(new Date().valueOf() + 3600000),
        expires: 120
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.default = mongoose_1.default.model("SessionProveedorModel", sessionProveedorSchema);
