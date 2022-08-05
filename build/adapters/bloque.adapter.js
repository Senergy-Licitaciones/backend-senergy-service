"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEnergiaBloqueAdapter = exports.createPotenciaBloqueAdapter = void 0;
const mongoose_1 = require("mongoose");
const createPotenciaBloqueAdapter = (request) => {
    console.log('iniciando adapter potencia', request);
    const array = new mongoose_1.Types.Array();
    console.log('array ', array);
    if (request.length === 0)
        return array;
    console.log('dsps del if');
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
    console.log('iniciando adapter energia', request);
    const array = new mongoose_1.Types.Array();
    console.log(array);
    if (request.length === 0)
        return array;
    console.log('dsps del if energy');
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
