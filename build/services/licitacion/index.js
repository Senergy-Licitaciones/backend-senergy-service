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
exports.getDatesFromLicitacion = exports.calculoExcel = exports.getParametrosFromExcel = exports.calculoSimple = exports.calculoFormulaConstante = exports.getProyeccionHistorialParametros = exports.makeCalculoService = exports.getEnergiaToAdd = exports.getListParametrosUsados = exports.getOfertasByLicitacionService = exports.getLicitacionesToAdmin = exports.getLicitacionByIdService = exports.getLicitacionesFreeService = exports.getTiposService = exports.updateLicitacionService = exports.crearLicitacionService = exports.mostrarLicitacionesService = void 0;
const adapters_1 = require("../../adapters");
const historial_parametros_1 = require("../../dao/historial-parametros");
const licitacion_1 = require("../../dao/licitacion");
const oferta_1 = require("../../dao/oferta");
const handleError_1 = require("../../helpers/handleError");
const utils_1 = require("../../utils");
const excel_1 = require("../excel");
const dateFormat_1 = require("../../utils/dateFormat");
const fs_1 = __importDefault(require("fs"));
const formulasProyeccion_1 = require("../../utils/formulasProyeccion");
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
const getListParametrosUsados = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
                energiaHfp: [],
                total: 0
            };
        });
        return {
            parametros,
            historialOfertas,
            ofertas
        };
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e);
    }
});
exports.getListParametrosUsados = getListParametrosUsados;
const getEnergiaToAdd = (potenciaOferta, potenciaContratadaHp, potenciaMinimaFact, factorPlanta) => {
    const energiaMes = factorPlanta * potenciaContratadaHp * 24 * 30 / 1000;
    const pagoPotencia = potenciaContratadaHp * potenciaMinimaFact * potenciaOferta;
    return pagoPotencia / (energiaMes * 12);
};
exports.getEnergiaToAdd = getEnergiaToAdd;
const makeCalculoService = ({ historialOfertas, historicoParametros, ofertas, licitacion }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // historico sacado de la proyeccion hecha del historico base de parametros
        // const historicoParametros = await getHistorialParametrosListDao(parametros)
        console.log('historicoParametros ', historicoParametros);
        ofertas.map((oferta, i) => {
            // para potencia en bloques y más de dos factores de indexación
            const bloquesMesesPotencia = oferta.potencia.map((bloque) => {
                const meses = (0, utils_1.generateMesesArray)(bloque.fechaInicio, bloque.fechaFin);
                return meses;
            });
            // calcular equivalente en energia
            const energia = (0, exports.getEnergiaToAdd)(oferta.potencia[0].potencia, licitacion.potenciaContratadaHp, oferta.potMinFacturable / 100, licitacion.factorPlanta);
            const bloquesMesesEnergiaHp = oferta.energiaHp.map((bloque) => {
                const meses = (0, utils_1.generateMesesArray)(bloque.fechaInicio, bloque.fechaFin);
                return meses;
            });
            const bloquesMesesEnergiaHfp = oferta.energiaHfp.map((bloque) => {
                const meses = (0, utils_1.generateMesesArray)(bloque.fechaInicio, bloque.fechaFin);
                return meses;
            });
            historialOfertas[i].potencia = (0, utils_1.calcularHistorico)(historicoParametros, bloquesMesesPotencia, oferta);
            historialOfertas[i].energiaHp = (0, utils_1.calcularHistoricoEnergiaHp)(energia, historicoParametros, bloquesMesesEnergiaHp, oferta);
            historialOfertas[i].energiaHfp = (0, utils_1.calcularHistoricoEnergiaHfp)(energia, historicoParametros, bloquesMesesEnergiaHfp, oferta);
            historialOfertas[i].monomico = historialOfertas[i].potencia.map((value, j) => {
                const precioPotencia = value.value * 100 * 10 / (720 * 0.79751092507001);
                console.log('first precio potencia ', precioPotencia);
                const precioEnergia = (5 * historialOfertas[i].energiaHp[j].value / 24) + (19 * historialOfertas[i].energiaHfp[j].value / 24);
                return {
                    fecha: value.fecha,
                    value: precioPotencia + precioEnergia
                };
            });
            historialOfertas[i].total = historialOfertas[i].monomico.reduce((total, el) => {
                return total + el.value;
            }, 0);
            return null;
        });
        return historialOfertas;
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e);
    }
});
exports.makeCalculoService = makeCalculoService;
// TODO: Histrial Parametros Proyeccion fechas en formato "[Mes sin 0]-[Año completo]". Ejemplo: 8/2022
const getProyeccionHistorialParametros = (fechaOferta, fechaFinal, listIdsParametros) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('fechaOferta', fechaOferta, 'fecha final', fechaFinal);
        const parametrosBase = yield (0, historial_parametros_1.getHistorialParametrosListDao)(listIdsParametros);
        const parametrosProyectados = parametrosBase.map((parametro) => {
            let valorBase = 0;
            let existBase = false;
            const mesesProyectados = (0, utils_1.generateMesesArray)((0, dateFormat_1.formatMesStringToDate)(fechaOferta), (0, dateFormat_1.formatMesStringToDate)(fechaFinal));
            if (parametro.values[parametro.values.length - 1].fecha === fechaOferta) {
                // existe parametro para la fecha en la que se hizo la oferta
                existBase = true;
            }
            // no existe parametro para la fecha en la que se hizo la oferta
            valorBase = parametro.values[parametro.values.length - 1].value;
            let valuePrev = valorBase;
            const valoresParametrosProyectados = mesesProyectados.map((mes, i) => {
                let value = 0;
                if (parametro.name.includes('PPI')) {
                    value = (0, formulasProyeccion_1.proyeccionPPI)(valuePrev);
                }
                if (parametro.name.includes('IPC')) {
                    value = (0, formulasProyeccion_1.proyeccionIPC)(valuePrev);
                }
                if (parametro.name.includes('PGN(US$/MMBTU) (OSINERGMIN)')) {
                    value = (0, formulasProyeccion_1.proyeccionPGNDolarOsinergmin)(valuePrev);
                }
                if (parametro.name.includes('PGN(S/./MMBTU) (OSINERGMIN)')) {
                    value = (0, formulasProyeccion_1.proyeccionPGNSolesOsinergmin)(valuePrev);
                }
                if (parametro.name.includes('PGN(US$/MMBTU)(COES)')) {
                    value = (0, formulasProyeccion_1.proyeccionPGNDolarCoes)(valuePrev);
                }
                if (parametro.name.includes('PCB') || parametro.name.includes('PR6')) {
                    value = (0, formulasProyeccion_1.proyeccionPCBandPR6)(valuePrev);
                }
                if (parametro.name.includes('TBarra')) {
                    value = (0, formulasProyeccion_1.proyeccionTarifaChiclayo)(valuePrev);
                }
                valuePrev = value;
                return {
                    fecha: mes,
                    value: existBase && i === 0 ? valorBase : value
                };
            });
            return {
                _id: parametro._id,
                name: parametro.name,
                values: valoresParametrosProyectados
            };
        });
        return parametrosProyectados;
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e);
    }
});
exports.getProyeccionHistorialParametros = getProyeccionHistorialParametros;
// FIXME: expotFileProyeccionParamtros() para exportar excel
const calculoFormulaConstante = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { historialOfertas, ofertas, parametros } = yield (0, exports.getListParametrosUsados)(id);
        const data = yield (0, licitacion_1.getDataFromLicitacionToCalculo)(id);
        if (ofertas.length === 0)
            throw new Error('No existen ofertas para esta licitación');
        const historicoParametros = yield (0, exports.getProyeccionHistorialParametros)((0, dateFormat_1.formatMesDateToString)((0, dateFormat_1.formatFromStringToDate)(data.fechaInicioApertura)), (0, dateFormat_1.formatMesDateToString)((0, dateFormat_1.formatFromStringToDate)(data.fechaFin)), parametros);
        const response = yield (0, exports.makeCalculoService)({ historialOfertas, historicoParametros, ofertas, licitacion: { factorPlanta: data.factorPlanta, potenciaContratadaHp: data.meses[0].hp } });
        return {
            data: response,
            proyeccionParametros: historicoParametros,
            ganador: response.reduce((ganador, empresa) => {
                if (empresa.total < ganador.total) {
                    return empresa;
                }
                return ganador;
            }, { empresa: '', total: Infinity }).empresa
        };
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e);
    }
});
exports.calculoFormulaConstante = calculoFormulaConstante;
const calculoSimple = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { historialOfertas, ofertas, parametros } = yield (0, exports.getListParametrosUsados)(id);
        const [historicoParametros, data] = yield Promise.all([(0, historial_parametros_1.getHistorialParametrosListDao)(parametros), (0, licitacion_1.getDataFromLicitacionToCalculo)(id)]);
        const response = yield (0, exports.makeCalculoService)({ historialOfertas, historicoParametros, ofertas, licitacion: { factorPlanta: data.factorPlanta, potenciaContratadaHp: data.meses[0].hp } });
        return {
            data: response,
            ganador: response.reduce((ganador, empresa) => {
                if (empresa.total < ganador.total) {
                    return empresa;
                }
                return ganador;
            }, { empresa: '', total: Infinity }).empresa
        };
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e);
    }
});
exports.calculoSimple = calculoSimple;
const getParametrosFromExcel = (parametros, filename) => {
    const workbook = (0, excel_1.readExcelFile)(filename);
    const sheet = workbook.Sheets['Parametros Proyeccion'];
    const json = (0, excel_1.getJsonFromSheet)(sheet);
    const data = (0, adapters_1.createParametrosProyeccionAdapter)(json);
    return data.filter((parametro) => parametros.includes(parametro._id));
};
exports.getParametrosFromExcel = getParametrosFromExcel;
const calculoExcel = ({ filename, idLicitacion }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [{ historialOfertas, ofertas, parametros }, data] = yield Promise.all([(0, exports.getListParametrosUsados)(idLicitacion), (0, licitacion_1.getDataFromLicitacionToCalculo)(idLicitacion)]);
        const historicoParametros = (0, exports.getParametrosFromExcel)(parametros, filename);
        const response = yield (0, exports.makeCalculoService)({ historialOfertas, historicoParametros, ofertas, licitacion: { factorPlanta: data.factorPlanta, potenciaContratadaHp: data.meses[0].hp } });
        fs_1.default.rmSync(filename);
        return {
            data: response,
            ganador: response.reduce((menor, el) => {
                return el.total < menor.total ? el : menor;
            }, { empresa: '', total: Infinity }).empresa
        };
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e);
    }
});
exports.calculoExcel = calculoExcel;
const getDatesFromLicitacion = (idLicitacion) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitacion = yield (0, licitacion_1.getLicitacionByIdDao)(idLicitacion);
        return {
            fechaInicio: (0, dateFormat_1.formatFromStringToDate)(licitacion.fechaInicio),
            fechaFin: (0, dateFormat_1.formatFromStringToDate)(licitacion.fechaFin)
        };
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e);
    }
});
exports.getDatesFromLicitacion = getDatesFromLicitacion;
