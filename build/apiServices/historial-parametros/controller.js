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
exports.exportFile = exports.addParametro = void 0;
const handleError_1 = require("../../helpers/handleError");
const historial_parametros_1 = require("../../services/historial-parametros");
const addParametro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        const response = yield (0, historial_parametros_1.addParametroService)(fields);
        if ('error' in response)
            return res.status(400).send(response);
        return res.status(200).send(response);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.addParametro = addParametro;
const exportFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.admin;
        const { fechaInicio, fechaFin } = req.body;
        const response = yield (0, historial_parametros_1.exportFileService)({ fechaInicio, fechaFin, id: _id });
        if ('error' in response)
            return res.status(400).send(response);
        return res.status(200).send(response);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.exportFile = exportFile;
