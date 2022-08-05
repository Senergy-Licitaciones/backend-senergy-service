"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEnergiaBloqueAdapter = exports.createPotenciaBloqueAdapter = void 0;
const mongoose_1 = require("mongoose");
const createPotenciaBloqueAdapter = (request) => {
    const array = new mongoose_1.Types.Array();
    if (request.length === 0)
        return array;
    request.map((bloque) => {
        return array.push({
            potencia: bloque.potencia,
            fechaInicio: new Date(bloque.fechaInicio),
            fechaFin: new Date(bloque.fechaFin)
        });
    });
    return array;
};
exports.createPotenciaBloqueAdapter = createPotenciaBloqueAdapter;
const createEnergiaBloqueAdapter = (request) => {
    const array = new mongoose_1.Types.Array();
    console.log(array);
    if (request.length === 0)
        return array;
    request.map((bloque) => {
        return array.push({
            energia: bloque.energia,
            fechaInicio: new Date(bloque.fechaInicio),
            fechaFin: new Date(bloque.fechaFin)
        });
    });
    console.log(array);
    return array;
};
exports.createEnergiaBloqueAdapter = createEnergiaBloqueAdapter;
