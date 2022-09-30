"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMesDateToString = exports.formatMesStringToDate = exports.formatFromStringToDate = void 0;
const formatFromStringToDate = (fecha) => {
    const arrayFecha = fecha.split('-');
    return new Date(parseInt(arrayFecha[0]), parseInt(arrayFecha[1]) - 1, parseInt(arrayFecha[2]));
};
exports.formatFromStringToDate = formatFromStringToDate;
const formatMesStringToDate = (mes) => {
    const arrayFecha = mes.split('-');
    return new Date(parseInt(arrayFecha[1]), parseInt(arrayFecha[0]) - 1);
};
exports.formatMesStringToDate = formatMesStringToDate;
const formatMesDateToString = (fecha) => {
    const mes = (fecha.getMonth() + 1).toString();
    const year = fecha.getFullYear().toString();
    return mes + '-' + year;
};
exports.formatMesDateToString = formatMesDateToString;
