"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enums_1 = require("../../types/data/enums");
const historialParametrosSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        enum: enums_1.Parametro,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    unidad: {
        type: String,
        enum: enums_1.Unidad,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.default = mongoose_1.default.model('HistorialParametrosModel', historialParametrosSchema);
