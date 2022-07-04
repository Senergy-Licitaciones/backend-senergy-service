"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFromStringToDate = void 0;
const formatFromStringToDate = (fecha) => {
    const arrayFecha = fecha.split('-');
    return new Date(parseInt(arrayFecha[0]), parseInt(arrayFecha[1]) - 1, parseInt(arrayFecha[2]));
};
exports.formatFromStringToDate = formatFromStringToDate;
