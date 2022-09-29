"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proyeccionTarifaChiclayo = exports.proyeccionPCBandPR6 = exports.proyeccionPGNDolarCoes = exports.proyeccionPGNSolesOsinergmin = exports.proyeccionPGNDolarOsinergmin = exports.proyeccionIPC = exports.proyeccionPPI = void 0;
const proyeccionPPI = (valorBase) => {
    return valorBase * (1 + 0.016 / 12);
};
exports.proyeccionPPI = proyeccionPPI;
const proyeccionIPC = (valorBase) => {
    return valorBase * (1 + 0.004505);
};
exports.proyeccionIPC = proyeccionIPC;
const proyeccionPGNDolarOsinergmin = (valorBase) => {
    return valorBase * (1 + 0.0283 / 12);
};
exports.proyeccionPGNDolarOsinergmin = proyeccionPGNDolarOsinergmin;
const proyeccionPGNSolesOsinergmin = (valorBase) => {
    return valorBase * (1 + 0.00551);
};
exports.proyeccionPGNSolesOsinergmin = proyeccionPGNSolesOsinergmin;
const proyeccionPGNDolarCoes = (valorBase) => {
    return valorBase * (1 + 0.025 / 12);
};
exports.proyeccionPGNDolarCoes = proyeccionPGNDolarCoes;
const proyeccionPCBandPR6 = (valorBase) => {
    return valorBase * (1 + 0.00133);
};
exports.proyeccionPCBandPR6 = proyeccionPCBandPR6;
const proyeccionTarifaChiclayo = (valorBase) => {
    return valorBase * (1 + 0.025 / 12);
};
exports.proyeccionTarifaChiclayo = proyeccionTarifaChiclayo;
