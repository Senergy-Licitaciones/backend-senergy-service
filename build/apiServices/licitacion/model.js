"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema.Types;
const licitacionSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    fechaInicioApertura: {
        type: String,
        trim: true,
        required: true
    },
    fechaFinApertura: {
        type: String,
        trim: true,
        required: true
    },
    tipoServicio: {
        type: ObjectId,
        ref: 'ServicioModel',
        required: true,
        trim: true
    },
    numLicitacion: {
        type: Number,
        required: true,
        trim: true
    },
    requisitos: {
        type: String,
        trim: true
    },
    estado: {
        type: String,
        enum: ['cerrado', 'abierto'],
        trim: true,
        required: true,
        default: 'cerrado'
    },
    empresa: {
        type: String,
        trim: true,
        required: true
    },
    fechaInicio: {
        type: String,
        trim: true,
        required: true
    },
    fechaFin: {
        type: String,
        trim: true,
        required: true
    },
    puntoSum: {
        type: ObjectId,
        ref: 'PuntoSumModel',
        trim: true,
        required: true
    },
    brg: {
        type: ObjectId,
        ref: 'BrgModel',
        trim: true,
        required: true
    },
    factorPlanta: {
        type: Number,
        required: true
    },
    meses: [
        {
            _id: false,
            mes: {
                type: String,
                trim: true,
                required: true
            },
            hp: {
                type: Number,
                required: true
            },
            hfp: {
                type: Number,
                required: true
            }
        }
    ],
    usuario: {
        type: ObjectId,
        ref: 'UsuarioModel'
    },
    participantes: [
        {
            type: ObjectId,
            ref: 'ProveedorModel'
        }
    ],
    author: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = mongoose_1.default.model('LicitacionModel', licitacionSchema);
