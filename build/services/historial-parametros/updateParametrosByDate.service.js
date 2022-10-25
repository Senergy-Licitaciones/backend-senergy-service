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
exports.updateParametrosByDateService = void 0;
const historial_parametros_1 = require("../../dao/historial-parametros");
const handleError_1 = require("../../helpers/handleError");
const updateParametrosByDateService = ({ fecha, parametros }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, historial_parametros_1.updateParametrosByDateDao)({ fecha, parametros });
        return response;
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e);
    }
});
exports.updateParametrosByDateService = updateParametrosByDateService;
