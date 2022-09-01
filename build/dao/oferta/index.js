"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOfertasByLicitacionAndProveedorDao = exports.getOfertasByLicitacionDao = exports.getOfertasToProveedorDashboardDao = exports.updateOfertaDao = exports.getOfertaByIdDao = exports.getOfertasDao = exports.crearOfertaDao = void 0;
const model_1 = __importDefault(require("../../apiServices/oferta/model"));
const handleError_1 = require("../../helpers/handleError");
const crearOfertaDao = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('fields ', fields);
        const oferta = yield model_1.default.create(fields);
        const result = yield oferta.save();
        console.log('oferta: ', oferta);
        console.log('result ', result);
        return result;
    }
    catch (err) {
        console.log('error ', err);
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al crear la oferta');
    }
});
exports.crearOfertaDao = crearOfertaDao;
const getOfertasDao = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ofertas = yield model_1.default.find({
            proveedor: id
        }).populate('licitacion');
        return ofertas;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al obtener las ofertas');
    }
});
exports.getOfertasDao = getOfertasDao;
const getOfertaByIdDao = (ofertaId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oferta = yield model_1.default.findById(ofertaId);
        if (oferta == null)
            throw new Error('No eexiste la oferta seleccionada');
        return oferta;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al obtener la oferta');
    }
});
exports.getOfertaByIdDao = getOfertaByIdDao;
const updateOfertaDao = ({ ofertaId, fields }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = Date.now();
        const oferta = yield model_1.default.findById(ofertaId).populate('licitacion');
        // if (!oferta) throw new Error('La oferta seleccionada no existe')
        if (new Date(oferta.licitacion.fechaFinApertura).getMilliseconds() > date)
            throw new Error('El plazo de tiempo para modificar esta oferta ya culminó');
        const result = yield oferta.update(fields);
        console.log('Result update ', result);
        return oferta;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al actualizar la oferta');
    }
});
exports.updateOfertaDao = updateOfertaDao;
const getOfertasToProveedorDashboardDao = (idProveedor) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ofertas = yield model_1.default.find({ proveedor: idProveedor }).select('licitacion createdAt updatedAt').populate('licitacion').select('fechaInicio empresa');
        console.log('ofertas', ofertas);
        return ofertas;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al obtener las ofertas');
    }
});
exports.getOfertasToProveedorDashboardDao = getOfertasToProveedorDashboardDao;
const getOfertasByLicitacionDao = (licitacionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ofertas = yield model_1.default.find({ licitacion: licitacionId });
        return ofertas;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al obtener las ofertas por licitación');
    }
});
exports.getOfertasByLicitacionDao = getOfertasByLicitacionDao;
const getOfertasByLicitacionAndProveedorDao = ({ licitacionId }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ofertas = yield model_1.default.find({ licitacion: licitacionId }).populate('proveedor').select(' razSocial ');
        return ofertas;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al obtener las ofertas por licitación');
    }
});
exports.getOfertasByLicitacionAndProveedorDao = getOfertasByLicitacionAndProveedorDao;
