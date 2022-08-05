"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOfertaAdapter = void 0;
const bloque_adapter_1 = require("./bloque.adapter");
const createOfertaAdapter = (request) => {
    return {
        excesoPotencia: request.excesoPotencia,
        excesoEnergiaHp: request.excesoEnergiaHp,
        excesoEnergiaHfp: request.excesoEnergiaHfp,
        formulaIndexEnergia: request.formulaIndexEnergia,
        formulaIndexPotencia: request.formulaIndexPotencia,
        licitacion: request.licitacion,
        potenciaFacturar: request.potenciaFacturar,
        potMinFacturable: request.potMinFacturable,
        tarifaEnergiaHp: request.tarifaEnergiaHp,
        tarifaEnergiaHfp: request.tarifaEnergiaHfp,
        tarifaPotencia: request.tarifaPotencia,
        potencia: (0, bloque_adapter_1.createPotenciaBloqueAdapter)(request.potencia),
        energiaHp: (0, bloque_adapter_1.createEnergiaBloqueAdapter)(request.energiaHp),
        energiaHfp: (0, bloque_adapter_1.createEnergiaBloqueAdapter)(request.energiaHfp)
    };
};
exports.createOfertaAdapter = createOfertaAdapter;
