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
exports.getTarifas = exports.updateTarifa = exports.updateTarifas = exports.getFilename = exports.addTarifas = exports.exportFileToUpdate = exports.downloadFile = exports.deleteTarifas = exports.exportFile = void 0;
const handleError_1 = require("../../helpers/handleError");
const tarifa_energia_hfp_1 = require("../../services/tarifa-energia-hfp");
const exportFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.admin;
        const { fechaInicio, fechaFin } = req.body;
        const response = yield (0, tarifa_energia_hfp_1.exportFileTarifa)({ fechaInicio, fechaFin, id: _id });
        return res.status(200).send(response);
    }
    catch (e) {
        return (0, handleError_1.httpError)(res, e);
    }
});
exports.exportFile = exportFile;
const deleteTarifas = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, tarifa_energia_hfp_1.deleteTarifasService)();
        return res.status(200).send(response);
    }
    catch (e) {
        return (0, handleError_1.httpError)(res, e);
    }
});
exports.deleteTarifas = deleteTarifas;
const downloadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filename } = req.params;
        if (filename == null)
            return res.status(400).send({ message: 'No se encontró el archivo' });
        return res.status(200).download(`uploads/files/admin/${filename}`);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.downloadFile = downloadFile;
const exportFileToUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.admin;
        const response = yield (0, tarifa_energia_hfp_1.exportFileToUpdateService)({ id: _id });
        return res.status(200).send(response);
    }
    catch (e) {
        return (0, handleError_1.httpError)(res, e);
    }
});
exports.exportFileToUpdate = exportFileToUpdate;
const addTarifas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (file == null)
            return res.status(400).send({ message: 'No se ha subido ningún archivo' });
        const path = 'uploads/files/admin/' + file.filename;
        const response = yield (0, tarifa_energia_hfp_1.addTarifasService)({ filename: path });
        return res.status(200).send(response);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.addTarifas = addTarifas;
const getFilename = (req, _res, next, filename) => {
    req.filename = filename;
    return next();
};
exports.getFilename = getFilename;
const updateTarifas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (file == null)
            return res.status(400).send({ message: 'No se ha subido ningún archivo' });
        const path = `uploads/files/admin/${file.filename}`;
        const response = yield (0, tarifa_energia_hfp_1.updateTarifasService)({ path });
        console.log('antes del response');
        return res.status(200).send(response);
    }
    catch (e) {
        return (0, handleError_1.httpError)(res, e);
    }
});
exports.updateTarifas = updateTarifas;
const updateTarifa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idTarifa } = req.params;
        const { value, fecha } = req.body;
        const response = yield (0, tarifa_energia_hfp_1.updateTarifaService)({ id: idTarifa, valor: value, fecha });
        return res.status(200).send(response);
    }
    catch (e) {
        return (0, handleError_1.httpError)(res, e);
    }
});
exports.updateTarifa = updateTarifa;
const getTarifas = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tarifas = yield (0, tarifa_energia_hfp_1.getTarifasService)();
        return res.status(200).send(tarifas);
    }
    catch (e) {
        return (0, handleError_1.httpError)(res, e);
    }
});
exports.getTarifas = getTarifas;
