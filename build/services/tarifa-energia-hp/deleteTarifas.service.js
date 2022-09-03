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
exports.deleteTarifasService = void 0;
const tarifa_energia_hp_1 = require("../../dao/tarifa-energia-hp");
const handleError_1 = require("../../helpers/handleError");
const deleteTarifasService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, tarifa_energia_hp_1.deleteTarifasDao)();
        return {
            message: 'Tarifas eliminadas exitosamente'
        };
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e);
    }
});
exports.deleteTarifasService = deleteTarifasService;