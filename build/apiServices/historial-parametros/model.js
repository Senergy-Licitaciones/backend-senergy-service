"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const historialParametrosSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    values: [
        {
            _id: false,
            fecha: {
                type: String,
                required: true,
                trim: true
            },
            value: {
                type: Number,
                required: true
            }
        }
    ]
}, {
    versionKey: false,
    timestamps: true
});
exports.default = mongoose_1.default.model('HistorialParametrosModel', historialParametrosSchema);
