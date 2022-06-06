"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const usuarioSchema = new mongoose_1.default.Schema({
    correo: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    empresa: {
        type: String,
        trim: true,
        required: true
    },
    ruc: {
        type: Number,
        trim: true,
        required: true,
        length: 11
    },
    phone: {
        type: Number,
        trim: true,
        length: 9,
        required: true
    },
    web: {
        type: String,
        trim: true,
        maxlength: 64
    },
    address: {
        type: String,
        trim: true,
        maxlength: 64
    },
    estado: {
        type: String,
        enum: ["online", "offline", "toConfirm"],
        trim: true,
        default: "toConfirm"
    },
    sessionId: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ["basico", "premium", "admin"],
        trim: true,
        default: "basico"
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.default = mongoose_1.default.model("UsuarioModel", usuarioSchema);
