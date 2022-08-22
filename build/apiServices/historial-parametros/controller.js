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
exports.deleteParametros = exports.getParametros = exports.exportFileToUpdate = exports.updateParametros = exports.addParametros = exports.downloadFile = exports.getFilename = exports.exportFile = void 0;
const handleError_1 = require("../../helpers/handleError");
const historial_parametros_1 = require("../../services/historial-parametros");
/* export const addParametro: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as {name: Parametro, unidad: Unidad, valor: number, fecha: string}
    const response = await addParametroService(fields)
    if ('error' in response) return res.status(400).send(response)
    return res.status(200).send(response)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
} */
const exportFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.admin;
        const { fechaInicio, fechaFin } = req.body;
        const response = yield (0, historial_parametros_1.exportFileService)({ fechaInicio, fechaFin, id: _id });
        return res.status(200).send(response);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.exportFile = exportFile;
const getFilename = (req, _res, next, filename) => {
    req.filename = filename;
    return next();
};
exports.getFilename = getFilename;
const downloadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filename = req.filename;
        if (filename == null)
            return res.status(400).send({ message: 'No se encontró el archivo' });
        return res.status(200).download(`uploads/files/admin/${filename}`);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.downloadFile = downloadFile;
const addParametros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        console.log('iniciando request');
        if (file == null)
            return res.status(400).send({ message: 'No se ha subido ningún archivo' });
        const path = 'uploads/files/admin/' + file.filename;
        const response = yield (0, historial_parametros_1.addParametrosService)({ filename: path });
        console.log('antes del response');
        return res.status(200).send(response);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.addParametros = addParametros;
const updateParametros = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        console.log('iniciando request');
        if (file == null)
            return res.status(400).send({ message: 'No se ha subido ningún archivo' });
        const path = `uploads/files/admin/${file.filename}`;
        const response = yield (0, historial_parametros_1.updateParametrosService)({ path });
        console.log('antes del response');
        return res.status(200).send(response);
    }
    catch (e) {
        return (0, handleError_1.httpError)(res, e);
    }
});
exports.updateParametros = updateParametros;
const exportFileToUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.admin;
        const response = yield (0, historial_parametros_1.exportFileToUpdateService)({ id: _id });
        return res.status(200).send(response);
    }
    catch (e) {
        return (0, handleError_1.httpError)(res, e);
    }
});
exports.exportFileToUpdate = exportFileToUpdate;
const getParametros = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parametros = yield (0, historial_parametros_1.getParametrosService)();
        return res.status(200).send(parametros);
    }
    catch (e) {
        return (0, handleError_1.httpError)(res, e);
    }
});
exports.getParametros = getParametros;
const deleteParametros = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, historial_parametros_1.deleteParametrosService)();
        return res.status(200).send(response);
    }
    catch (e) {
        return (0, handleError_1.httpError)(res, e);
    }
});
exports.deleteParametros = deleteParametros;
