"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tarifaPotenciaSchema = new mongoose_1.Schema({
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
exports.default = (0, mongoose_1.model)('TarifaPotenciaModel', tarifaPotenciaSchema);
