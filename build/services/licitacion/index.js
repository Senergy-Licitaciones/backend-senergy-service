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
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCalculoService = exports.getLicitacionesToAdmin = exports.getLicitacionByIdService = exports.getLicitacionesFreeService = exports.getTiposService = exports.updateLicitacionService = exports.crearLicitacionService = exports.mostrarLicitacionesService = void 0;
const licitacion_1 = require("../../dao/licitacion");
const oferta_1 = require("../../dao/oferta");
const handleError_1 = require("../../helpers/handleError");
const mostrarLicitacionesService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, licitacion_1.showLicitacionesDao)();
        return result;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.mostrarLicitacionesService = mostrarLicitacionesService;
const crearLicitacionService = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, tipoServicio, numLicitacion, requisitos, estado, empresa, fechaInicioApertura, fechaFinApertura, fechaInicio, puntoSum, brg, factorPlanta, meses, fechaFin, usuario, author } = fields;
        yield (0, licitacion_1.createLicitacionDao)({ title, description, tipoServicio, numLicitacion, requisitos, estado, empresa, fechaInicioApertura, fechaFinApertura, fechaInicio, puntoSum, brg, factorPlanta, meses, fechaFin, usuario, author });
        return {
            message: 'Licitación creada exitosamente'
        };
    }
    catch (err) {
        console.log('error ', err);
        throw (0, handleError_1.handleError)(err);
    }
});
exports.crearLicitacionService = crearLicitacionService;
const updateLicitacionService = ({ fields, id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, licitacion_1.updateLicitacionDao)({ fields, id });
        return {
            message: result.message
        };
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.updateLicitacionService = updateLicitacionService;
const getTiposService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, licitacion_1.getTiposDao)(id);
        return result;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.getTiposService = getTiposService;
const getLicitacionesFreeService = (proveedorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitaciones = yield (0, licitacion_1.getLicitacionesFreeDao)(proveedorId);
        return licitaciones;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.getLicitacionesFreeService = getLicitacionesFreeService;
const getLicitacionByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitacion = yield (0, licitacion_1.getLicitacionByIdDao)(id);
        return licitacion;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.getLicitacionByIdService = getLicitacionByIdService;
const getLicitacionesToAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitaciones = yield (0, licitacion_1.getLicitacionesToAdminDao)();
        return licitaciones;
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e);
    }
});
exports.getLicitacionesToAdmin = getLicitacionesToAdmin;
const makeCalculoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ofertas = yield (0, oferta_1.getOfertasByLicitacionAndProveedorDao)({ licitacionId: id });
        let historiaOfertas = {};
        ofertas.map((oferta) => {
            historiaOfertas = Object.assign(Object.assign({}, historiaOfertas), { [oferta.proveedor.razSocial]: {
                    potencia: [],
                    energiaHp: [],
                    energiaHfp: [],
                    monomico: []
                } });
            return null;
        });
        return {
            message: 'Calculo hecho exitosamente'
        };
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e);
    }
});
exports.makeCalculoService = makeCalculoService;
