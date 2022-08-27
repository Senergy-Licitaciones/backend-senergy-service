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
exports.exportFileToUpdateService = exports.exportFileService = void 0;
const constants_1 = require("../../constants");
const historial_parametros_1 = require("../../dao/historial-parametros");
const handleError_1 = require("../../helpers/handleError");
const utils_1 = require("../../utils");
const excel_1 = require("../excel");
const exportFileService = ({ fechaInicio, fechaFin, id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meses = (0, utils_1.generateMesesArray)(fechaInicio, fechaFin);
        const ids = meses.map((_mes, i) => i + 1);
        const values = meses.map((_mes) => 0);
        const workbook = (0, excel_1.createWorkbook)();
        const worksheet = (0, excel_1.createWorksheetFromArrays)([
            ['Meses', 'Nombre', ...meses],
            ['Codigo', 'Id', ...ids],
            ...constants_1.FACTORES.map((el) => ([el.nombre, el.codigo, ...values]))
        ]);
        (0, excel_1.addWorksheetToBook)(workbook, worksheet, 'Base de datos Factores');
        const path = `uploads/files/admin/base-de-datos-factores-${id}.xlsx`;
        (0, excel_1.createFile)(workbook, path);
        return {
            message: 'Se ha exportado el archivo exitosamente',
            filename: `base-de-datos-factores-${id}.xlsx`
        };
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.exportFileService = exportFileService;
const exportFileToUpdateService = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parametros = yield (0, historial_parametros_1.getParametrosDao)();
        const workbook = (0, excel_1.createWorkbook)();
        const fechas = parametros.reduce((acc, el) => {
            if (el.values.length > acc.length) {
                return el.values.map((value) => value.fecha);
            }
            return acc;
        }, parametros[0].values.map((value) => value.fecha));
        const worksheet = (0, excel_1.createWorksheetFromArrays)([
            ['Meses', 'Nombre', ...fechas],
            ['Codigo', 'Id', ...fechas.map((_el, i) => i + 1)],
            ...parametros.map((el, i) => {
                const restValues = new Array(fechas.length - el.values.length).fill(0);
                return [i, el.name, ...el.values.map((value) => value.value), ...restValues];
            })
        ]);
        (0, excel_1.addWorksheetToBook)(workbook, worksheet, 'Base de datos Factores');
        const path = `uploads/files/admin/base-de-datos-factores-${id}.xlsx`;
        (0, excel_1.createFile)(workbook, path);
        return {
            message: 'Se ha exportado el archivo exitosamente',
            filename: `base-de-datos-factores-${id}.xlsx`
        };
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e);
    }
});
exports.exportFileToUpdateService = exportFileToUpdateService;
