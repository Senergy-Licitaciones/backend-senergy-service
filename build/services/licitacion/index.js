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
exports.makeCalculoService = exports.getOfertasByLicitacionService = exports.getLicitacionesToAdmin = exports.getLicitacionByIdService = exports.getLicitacionesFreeService = exports.getTiposService = exports.updateLicitacionService = exports.crearLicitacionService = exports.mostrarLicitacionesService = void 0;
const historial_parametros_1 = require("../../dao/historial-parametros");
const licitacion_1 = require("../../dao/licitacion");
const oferta_1 = require("../../dao/oferta");
const handleError_1 = require("../../helpers/handleError");
const utils_1 = require("../../utils");
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
const getOfertasByLicitacionService = (idLicitacion) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ofertas = yield (0, oferta_1.getOfertasByLicitacionAndProveedorDao)({ licitacionId: idLicitacion });
        return ofertas;
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e);
    }
});
exports.getOfertasByLicitacionService = getOfertasByLicitacionService;
const makeCalculoService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ofertas = yield (0, oferta_1.getOfertasByLicitacionAndProveedorDao)({ licitacionId: id });
        console.log('ofertas ', ofertas);
        const parametros = [];
        const historialOfertas = ofertas.map((oferta) => {
            oferta.formulaIndexPotencia.map((formula) => {
                if (!parametros.includes(formula.indexId)) {
                    parametros.push(formula.indexId);
                }
                return null;
            });
            oferta.formulaIndexEnergia.map((formula) => {
                if (!parametros.includes(formula.indexId)) {
                    parametros.push(formula.indexId);
                }
                return null;
            });
            return {
                empresa: oferta.proveedor.razSocial,
                monomico: [],
                potencia: [],
                energiaHp: [],
                energiaHfp: []
            };
        });
        console.log('parametros ', parametros);
        const historicoParametros = yield (0, historial_parametros_1.getHistorialParametrosListDao)(parametros);
        console.log('historicoParametros ', historicoParametros);
        ofertas.map((oferta, i) => {
            // para potencia en bloques y más de dos factores de indexación
            const bloquesMesesPotencia = oferta.potencia.map((bloque) => {
                const meses = (0, utils_1.generateMesesArray)(bloque.fechaInicio, bloque.fechaFin);
                return meses;
            });
            console.log('bloques meses potencia ', bloquesMesesPotencia);
            const bloquesMesesEnergiaHp = oferta.energiaHp.map((bloque) => {
                const meses = (0, utils_1.generateMesesArray)(bloque.fechaInicio, bloque.fechaFin);
                return meses;
            });
            const bloquesMesesEnergiaHfp = oferta.energiaHfp.map((bloque) => {
                const meses = (0, utils_1.generateMesesArray)(bloque.fechaInicio, bloque.fechaFin);
                return meses;
            });
            console.log('bloques meses energia hp ', bloquesMesesEnergiaHp);
            historialOfertas[i].potencia = (0, utils_1.calcularHistorico)(historicoParametros, bloquesMesesPotencia, oferta);
            console.log('first potencia ', historialOfertas[i].potencia);
            historialOfertas[i].energiaHp = (0, utils_1.calcularHistoricoEnergiaHp)(historicoParametros, bloquesMesesEnergiaHp, oferta);
            console.log('first energia hp ', historialOfertas[i].energiaHp);
            historialOfertas[i].energiaHfp = (0, utils_1.calcularHistoricoEnergiaHfp)(historicoParametros, bloquesMesesEnergiaHfp, oferta);
            console.log('first energia hfp ', historialOfertas[i].energiaHfp);
            historialOfertas[i].monomico = historialOfertas[i].potencia.map((value, j) => {
                const precioPotencia = value * 100 * 10 / (720 * 0.79751092507001);
                console.log('first precio potencia ', precioPotencia);
                const precioEnergia = (5 * historialOfertas[i].energiaHp[j] / 24) + (19 * historialOfertas[i].energiaHfp[j] / 24);
                return precioPotencia + precioEnergia;
            });
            return null;
        });
        return historialOfertas;
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e);
    }
});
exports.makeCalculoService = makeCalculoService;
