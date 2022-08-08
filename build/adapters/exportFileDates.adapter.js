"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExportFileDates = void 0;
const createExportFileDates = ({ fechaInicio, fechaFin }) => {
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);
    return {
        fechaInicio: fechaInicioDate,
        fechaFin: fechaFinDate
    };
};
exports.createExportFileDates = createExportFileDates;
