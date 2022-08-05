"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOfertaAdapter = void 0;
const bloque_adapter_1 = require("./bloque.adapter");
const createOfertaAdapter = (request) => {
    return Object.assign(Object.assign({}, request), { potencia: (0, bloque_adapter_1.createPotenciaBloqueAdapter)(request.potencia), energiaHp: (0, bloque_adapter_1.createEnergiaBloqueAdapter)(request.energiaHp), energiaHfp: (0, bloque_adapter_1.createEnergiaBloqueAdapter)(request.energiaHfp) });
};
exports.createOfertaAdapter = createOfertaAdapter;
