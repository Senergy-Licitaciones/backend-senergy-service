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
exports.getLicitacionesToProveedorDashboardDao = exports.getLicitacionesByUserDao = exports.getLicitacionByIdDao = exports.getLicitacionesFreeDao = exports.getTiposDao = exports.updateLicitacionDao = exports.createLicitacionDao = exports.showLicitacionesDao = void 0;
const handleError_1 = require("../../helpers/handleError");
const model_1 = __importDefault(require("../../apiServices/licitacion/model"));
const enums_1 = require("../../types/form/enums");
const showLicitacionesDao = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitaciones = yield model_1.default.find().populate('tipoServicio');
        return licitaciones;
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error en la capa de datos');
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
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error en la capa de datos');
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
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error en la capa de datos');
    }
});
exports.updateLicitacionDao = updateLicitacionDao;
const getTiposDao = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield model_1.default.find({ usuario: id }).select('-participantes -usuario -puntoSum -brg -meses -tipoServicio');
        return result;
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error en la capa de datos');
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
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error en la capa de datos al obtener licitaciones libres');
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
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error en la capa de datos al mostrar la licitación ');
    }
});
exports.getLicitacionByIdDao = getLicitacionByIdDao;
const getLicitacionesByUserDao = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitaciones = yield model_1.default.find({ usuario: id });
        return licitaciones;
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error en la capa de datos al obtener las licitaciones');
    }
});
exports.getLicitacionesByUserDao = getLicitacionesByUserDao;
const getLicitacionesToProveedorDashboardDao = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitaciones = yield model_1.default.find({ estado: enums_1.Estado.Abierto }).select('empresa fechaInicioApertura fechaFinApertura createdAt updatedAt');
        console.log('licitaciones', licitaciones);
        return licitaciones;
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error al obtener la información en la capa de datos');
    }
});
exports.getLicitacionesToProveedorDashboardDao = getLicitacionesToProveedorDashboardDao;
