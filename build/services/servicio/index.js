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
exports.addServicioService = exports.getServiciosService = void 0;
const servicio_1 = require("../../dao/servicio");
const handleError_1 = require("../../helpers/handleError");
const getServiciosService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, servicio_1.getServiciosDao)();
        return result;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.getServiciosService = getServiciosService;
const addServicioService = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, servicio_1.createServicioDao)(fields);
        return response;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.addServicioService = addServicioService;
