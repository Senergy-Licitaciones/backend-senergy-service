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
exports.getLicitacionByIdService = exports.getLicitacionesFreeService = exports.getTiposService = exports.updateLicitacionService = exports.crearLicitacionService = exports.mostrarLicitacionesService = void 0;
const licitacion_1 = require("../../dao/licitacion");
const handleError_1 = require("../../helpers/handleError");
const mostrarLicitacionesService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, licitacion_1.showLicitacionesDao)();
        if ("error" in result)
            return (0, handleError_1.handleError)(result.error, result.message);
        return result;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de servicios");
    }
});
exports.mostrarLicitacionesService = mostrarLicitacionesService;
const crearLicitacionService = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, tipoServicio, numLicitacion, requisitos, estado, empresa, fechaInicioApertura, fechaFinApertura, fechaInicio, puntoSum, brg, factorPlanta, meses, fechaFin, usuario, author } = fields;
        const result = yield (0, licitacion_1.createLicitacionDao)({ title, description, tipoServicio, numLicitacion, requisitos, estado, empresa, fechaInicioApertura, fechaFinApertura, fechaInicio, puntoSum, brg, factorPlanta, meses, fechaFin, usuario, author });
        if ("error" in result)
            return (0, handleError_1.handleError)(result.error, result.message);
        return {
            message: "Licitación creada exitosamente"
        };
    }
    catch (err) {
        console.log("error ", err);
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de servicios");
    }
});
exports.crearLicitacionService = crearLicitacionService;
const updateLicitacionService = ({ fields, id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, licitacion_1.updateLicitacionDao)({ fields, id });
        if ("error" in result)
            (0, handleError_1.handleError)(result.error, result.message);
        return {
            message: result.message
        };
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de servicios");
    }
});
exports.updateLicitacionService = updateLicitacionService;
const getTiposService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, licitacion_1.getTiposDao)(id);
        if ("error" in result)
            return (0, handleError_1.handleError)(result.error, result.message);
        return result;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de servicios");
    }
});
exports.getTiposService = getTiposService;
const getLicitacionesFreeService = (proveedorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitaciones = yield (0, licitacion_1.getLicitacionesFreeDao)(proveedorId);
        if ("error" in licitaciones)
            return (0, handleError_1.handleError)(licitaciones.error, licitaciones.message);
        return licitaciones;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de servicios al mostrar licitaciones libres");
    }
});
exports.getLicitacionesFreeService = getLicitacionesFreeService;
const getLicitacionByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitacion = yield (0, licitacion_1.getLicitacionByIdDao)(id);
        if ("error" in licitacion)
            return (0, handleError_1.handleError)(licitacion.error, licitacion.message);
        return licitacion;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de servicios al intentar mostrar la licitación");
    }
});
exports.getLicitacionByIdService = getLicitacionByIdService;
