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
exports.getDataFromLicitacionToCalculo = exports.getLicitacionesToAdminDao = exports.getLicitacionesToProveedorDashboardDao = exports.getLicitacionesByUserDao = exports.getLicitacionByIdDao = exports.getLicitacionesFreeDao = exports.getTiposDao = exports.updateLicitacionDao = exports.createLicitacionDao = exports.showLicitacionesDao = void 0;
const handleError_1 = require("../../helpers/handleError");
const model_1 = __importDefault(require("../../apiServices/licitacion/model"));
const enums_1 = require("../../types/form/enums");
const showLicitacionesDao = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitaciones = yield model_1.default.find().populate('tipoServicio');
        return licitaciones;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al obtener las licitaciones');
    }
});
exports.showLicitacionesDao = showLicitacionesDao;
const createLicitacionDao = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_1.default.create(Object.assign({}, fields));
        return {
            message: 'Licitacion creada exitosamente'
        };
    }
    catch (err) {
        console.log('error ', err);
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al crear la licitacion');
    }
});
exports.createLicitacionDao = createLicitacionDao;
const updateLicitacionDao = ({ fields, id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield model_1.default.findByIdAndUpdate(id, Object.assign({}, fields), { new: true });
        if (result == null)
            throw new Error('No se encontró la licitación');
        return {
            message: 'Licitación actualizada exitosamente'
        };
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al actualizar la licitación');
    }
});
exports.updateLicitacionDao = updateLicitacionDao;
const getTiposDao = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield model_1.default.find({ usuario: id }).select('-participantes -usuario -puntoSum -brg -meses -tipoServicio');
        return result;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al obtener los tipos de licitación');
    }
});
exports.getTiposDao = getTiposDao;
const getLicitacionesFreeDao = (proveedorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitaciones = yield model_1.default.find({
            $nor: [{ participantes: proveedorId }]
        }).populate('tipoServicio');
        return licitaciones;
    }
    catch (err) {
        console.log('error ', err);
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al obtener las licitaciones libres');
    }
});
exports.getLicitacionesFreeDao = getLicitacionesFreeDao;
const getLicitacionByIdDao = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitacion = yield model_1.default.findById(id).select('-usuario -participantes').populate('tipoServicio puntoSum brg');
        // if (!licitacion) throw new Error('La licitación no existe')
        return licitacion;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al mostrar la licitación ');
    }
});
exports.getLicitacionByIdDao = getLicitacionByIdDao;
const getLicitacionesByUserDao = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitaciones = yield model_1.default.find({ usuario: id });
        return licitaciones;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al obtener las licitaciones por usuario');
    }
});
exports.getLicitacionesByUserDao = getLicitacionesByUserDao;
const getLicitacionesToProveedorDashboardDao = (proveedorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitaciones = yield model_1.default.find({ $nor: [{ participantes: proveedorId }], estado: enums_1.Estado.Abierto }).select('empresa fechaInicioApertura fechaFinApertura participantes createdAt updatedAt');
        console.log('licitaciones', licitaciones);
        return licitaciones;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al obtener la información del proveedor');
    }
});
exports.getLicitacionesToProveedorDashboardDao = getLicitacionesToProveedorDashboardDao;
const getLicitacionesToAdminDao = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitaciones = yield model_1.default.find().select('createdAt updatedAt author empresa estado fechaInicioApertura fechaFinApertura participantes fechaInicio fechaFin');
        return licitaciones;
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e, 'Ha courrido un error al obtener las licitaciones');
    }
});
exports.getLicitacionesToAdminDao = getLicitacionesToAdminDao;
const getDataFromLicitacionToCalculo = (idLicitacion) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield model_1.default.findById(idLicitacion).select('factorPlanta meses');
        if (response == null)
            throw new Error('Licitacion no encontrada');
        return response;
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e, 'Ha ocurrido un error al obtener las licitaciones');
    }
});
exports.getDataFromLicitacionToCalculo = getDataFromLicitacionToCalculo;
