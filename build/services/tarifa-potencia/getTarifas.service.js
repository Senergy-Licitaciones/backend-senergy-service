"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTarifasService = void 0;
const tarifa_potencia_1 = require("../../dao/tarifa-potencia");
const handleError_1 = require("../../helpers/handleError");
const getTarifasService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parametros = yield (0, tarifa_potencia_1.getTarifasDao)();
        return parametros;
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e);
    }
});
exports.getTarifasService = getTarifasService;
