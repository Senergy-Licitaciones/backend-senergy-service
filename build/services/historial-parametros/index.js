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
exports.exportFileService = exports.addParametroService = void 0;
const historial_parametros_1 = require("../../dao/historial-parametros");
const handleError_1 = require("../../helpers/handleError");
const dateFormat_1 = require("../../utils/dateFormat");
const xlsx_1 = __importDefault(require("xlsx"));
const constants_1 = require("../../constants");
const addParametroService = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parametro = yield (0, historial_parametros_1.addParametroDao)(Object.assign(Object.assign({}, fields), { fecha: (0, dateFormat_1.formatFromStringToDate)(fields.fecha) }));
        if ('error' in parametro)
            throw new Error(parametro.message);
        return {
            message: `Nuevo histórico de ${parametro.valor} agregado exitosamente`
        };
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error al agregar el dato en la capa de servicios');
    }
});
exports.addParametroService = addParametroService;
const exportFileService = ({ fechaInicio, fechaFin, id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fechaInicioDate = new Date(fechaInicio);
        const fechaFinDate = new Date(fechaFin);
        const months = (fechaFinDate.getFullYear() - fechaInicioDate.getFullYear()) * 12 + fechaFinDate.getMonth() - fechaInicioDate.getMonth() + 1;
        const array = Array(months).fill('');
        const flagDate = new Date(fechaInicioDate);
        const meses = array.map((_el, i) => {
            i !== 0 && flagDate.setMonth(flagDate.getMonth() + 1);
            return (flagDate.getMonth() + 1).toString() + '-' + flagDate.getFullYear().toString();
        });
        const ids = meses.map((_mes, i) => i + 1);
        const values = meses.map((_mes) => 0);
        const workbook = xlsx_1.default.utils.book_new();
        const worksheet = xlsx_1.default.utils.aoa_to_sheet([
            ['Meses', 'Nombre', ...meses],
            ['Codigo', 'Id', ...ids],
            ...constants_1.FACTORES.map((el) => ([el.nombre, el.codigo, ...values]))
        ]);
        xlsx_1.default.utils.book_append_sheet(workbook, worksheet, 'Base de datos Factores');
        xlsx_1.default.writeFile(workbook, `uploads/files/admin/base-de-datos-factores-${id}.xlsx`);
        return {
            message: 'Se ha exportado el archivo exitosamente'
        };
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error al exportar el archivo');
    }
});
exports.exportFileService = exportFileService;
