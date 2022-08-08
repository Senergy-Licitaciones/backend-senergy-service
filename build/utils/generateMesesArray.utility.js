"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMesesArray = void 0;
const generateMesesArray = (fechaInicio, fechaFin) => {
    const months = (fechaFin.getFullYear() - fechaInicio.getFullYear()) * 12 + fechaFin.getMonth() - fechaInicio.getMonth() + 1;
    const array = Array(months).fill('');
    const flagDate = new Date(fechaInicio);
    return array.map((_el, i) => {
        i !== 0 && flagDate.setMonth(flagDate.getMonth() + 1);
        return (flagDate.getMonth() + 1).toString() + '-' + flagDate.getFullYear().toString();
    });
};
exports.generateMesesArray = generateMesesArray;
