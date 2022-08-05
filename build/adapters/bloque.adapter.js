"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEnergiaBloqueAdapter = exports.createPotenciaBloqueAdapter = void 0;
const createPotenciaBloqueAdapter = (request) => {
    console.log('iniciando adapter potencia', request);
    console.log('dsps del if');
    return request.map((bloque) => {
        return {
            potencia: bloque.potencia,
            fechaInicio: new Date(bloque.fechaInicio),
            fechaFin: new Date(bloque.fechaFin)
        };
    });
};
exports.createPotenciaBloqueAdapter = createPotenciaBloqueAdapter;
const createEnergiaBloqueAdapter = (request) => {
    console.log('iniciando adapter energia', request);
    return request.map((bloque) => {
        return {
            energia: bloque.energia,
            fechaInicio: new Date(bloque.fechaInicio),
            fechaFin: new Date(bloque.fechaFin)
        };
    });
};
exports.createEnergiaBloqueAdapter = createEnergiaBloqueAdapter;
