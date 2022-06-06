"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const proveedorSchema = new mongoose_1.default.Schema({
    razSocial: {
        type: String,
        trim: true,
        required: true
    },
    ruc: {
        type: Number,
        length: 11,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["basico", "premium"],
        trim: true,
        required: true,
        default: "basico"
    },
    pais: {
        type: String,
        trim: true
    },
    web: {
        type: String,
        trim: true
    },
    correo: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        length: 9,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    licitaciones: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "LicitacionModel"
        }
    ],
    estado: {
        type: String,
        enum: ["online", "offline"],
        required: true,
        default: "offline"
    },
    codeToConfirm: {
        type: String,
        trim: true
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    session: {
        type: String,
        trim: true
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.default = mongoose_1.default.model("ProveedorModel", proveedorSchema);
