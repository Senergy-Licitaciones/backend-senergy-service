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
exports.exportFileToUpdateService = exports.exportFileTarifa = void 0;
const constants_1 = require("../../constants");
const tarifa_potencia_1 = require("../../dao/tarifa-potencia");
const handleError_1 = require("../../helpers/handleError");
const utils_1 = require("../../utils");
const excel_1 = require("../excel");
const exportFileTarifa = ({ fechaInicio, fechaFin, id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meses = (0, utils_1.generateMesesArray)(fechaInicio, fechaFin);
        const ids = meses.map((_mes, i) => i + 1);
        const values = meses.map((_mes) => 0);
        const workbook = (0, excel_1.createWorkbook)();
        const worksheet = (0, excel_1.createWorksheetFromArrays)([
            ['Meses', ...meses],
            ['Barra', ...ids],
            ...constants_1.TARIFAS_BARRA.map((el) => ([el, ...values]))
        ]);
        (0, excel_1.addWorksheetToBook)(workbook, worksheet, 'Base de datos Tarifa Potencia');
        const path = `uploads/files/admin/tarifas-potencia-${id}.xlsx`;
        (0, excel_1.createFile)(workbook, path);
        return {
            message: 'Se ha exportado el archivo exitosamente',
            filename: `tarifas-potencia-${id}.xlsx`
        };
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e);
    }
});
exports.exportFileTarifa = exportFileTarifa;
const exportFileToUpdateService = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tarifas = yield (0, tarifa_potencia_1.getTarifasDao)();
        const fechas = tarifas.reduce((acc, el) => {
            if (el.values.length > acc.length) {
                return el.values.map((value) => value.fecha);
            }
            return acc;
        }, tarifas[0].values.map((value) => value.fecha));
        const workbook = (0, excel_1.createWorkbook)();
        const worksheet = (0, excel_1.createWorksheetFromArrays)([
            ['Meses', ...fechas],
            ['Barra', ...fechas.map((_el, i) => i + 1)],
            ...tarifas.map((el) => {
                const restValues = new Array(fechas.length - el.values.length).fill(0);
                return [el.name, ...el.values.map((value) => value.value), ...restValues];
            })
        ]);
        (0, excel_1.addWorksheetToBook)(workbook, worksheet, 'Base de datos Tarifa Potencia');
        const path = `uploads/files/admin/tarifas-potencia-${id}.xlsx`;
        (0, excel_1.createFile)(workbook, path);
        return {
            message: 'Se ha exportado el archivo exitosamente',
            filename: `tarifas-potencia-${id}.xlsx`
        };
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e);
    }
});
exports.exportFileToUpdateService = exportFileToUpdateService;
