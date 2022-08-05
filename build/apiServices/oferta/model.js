"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema.Types;
const ofertaSchema = new mongoose_1.default.Schema({
    potencia: [
        {
            fechaInicio: {
                type: Date,
                required: true
            },
            fechaFin: {
                type: Date,
                required: true
            },
            potencia: {
                type: Number,
                required: true
            }
        }
    ],
    tarifaPotencia: {
        type: Boolean,
        default: false,
        required: true
    },
    tarifaEnergiaHp: {
        type: Boolean,
        default: false,
        required: true
    },
    tarifaEnergiaHfp: {
        type: Boolean,
        default: false,
        required: true
    },
    energiaHp: [
        {
            fechaInicio: {
                type: Date,
                required: true
            },
            fechaFin: {
                type: Date,
                required: true
            },
            energia: {
                type: Number,
                required: true
            }
        }
    ],
    energiaHfp: [
        {
            fechaInicio: {
                type: Date,
                required: true
            },
            fechaFin: {
                type: Date,
                required: true
            },
            energia: {
                type: Number,
                required: true
            }
        }
    ],
    potMinFacturable: {
        type: Number,
        required: true
    },
    potenciaFacturar: {
        type: String,
        trim: true,
        required: true
    },
    excesoPotencia: {
        type: Number,
        required: true
    },
    formulaIndexPotencia: [
        {
            index: {
                type: String,
                required: true,
                trim: true
            },
            factor: {
                type: Number,
                required: true
            }
        }
    ],
    formulaIndexEnergia: [
        {
            index: {
                type: String,
                required: true,
                trim: true
            },
            factor: {
                type: Number,
                required: true
            }
        }
    ],
    proveedor: {
        type: ObjectId,
        ref: 'ProveedorModel',
        required: true
    },
    licitacion: {
        type: ObjectId,
        ref: 'LicitacionModel',
        required: true
    },
    excesoEnergiaHp: {
        type: Number
    },
    excesoEnergiaHfp: {
        type: Number
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.default = mongoose_1.default.model('OfertaModel', ofertaSchema);
