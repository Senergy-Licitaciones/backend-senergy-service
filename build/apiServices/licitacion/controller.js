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
exports.makeCalculoExcel = exports.makeCalculo = exports.getLicitaciones = exports.licitacionId = exports.showLicitacionById = exports.showLicitacionesFree = exports.getTipos = exports.updateLicitacion = exports.createLicitacion = exports.showLicitaciones = void 0;
const handleError_1 = require("../../helpers/handleError");
const licitacion_1 = require("../../services/licitacion");
const showLicitaciones = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, licitacion_1.mostrarLicitacionesService)();
        return res.status(200).send(result);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.showLicitaciones = showLicitaciones;
const createLicitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        const result = yield (0, licitacion_1.crearLicitacionService)(fields);
        return res.status(200).send(result);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.createLicitacion = createLicitacion;
const updateLicitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        const id = req.licitacionId;
        const result = yield (0, licitacion_1.updateLicitacionService)({ fields, id });
        return res.status(200).send(result);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.updateLicitacion = updateLicitacion;
const getTipos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const result = yield (0, licitacion_1.getTiposService)(user._id);
        return res.status(200).send(result);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.getTipos = getTipos;
const showLicitacionesFree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedor = req.proveedor;
        const licitaciones = yield (0, licitacion_1.getLicitacionesFreeService)(proveedor._id);
        return res.status(200).send(licitaciones);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.showLicitacionesFree = showLicitacionesFree;
const showLicitacionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitacionId = req.licitacionId;
        const licitacion = yield (0, licitacion_1.getLicitacionByIdService)(licitacionId);
        return res.status(200).send(licitacion);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.showLicitacionById = showLicitacionById;
const licitacionId = (req, _res, next, id) => {
    req.licitacionId = id;
    next();
};
exports.licitacionId = licitacionId;
const getLicitaciones = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitaciones = yield (0, licitacion_1.getLicitacionesToAdmin)();
        return res.status(200).send(licitaciones);
    }
    catch (e) {
        return (0, handleError_1.httpError)(res, e);
    }
});
exports.getLicitaciones = getLicitaciones;
const makeCalculo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitacionId = req.licitacionId;
        if (licitacionId == null)
            throw new Error('No se proporcionó la licitación');
        const response = yield (0, licitacion_1.calculoSimple)(licitacionId);
        return res.status(200).send(response);
    }
    catch (e) {
        return (0, handleError_1.httpError)(res, e);
    }
});
exports.makeCalculo = makeCalculo;
const makeCalculoExcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitacionId = req.licitacionId;
        const file = req.file;
        if (licitacionId == null)
            throw new Error('No se proporcionó la licitación');
        if (file == null)
            return res.status(400).send({ message: 'No se ha subido ningún archivo' });
        const path = 'uploads/files/admin/' + file.filename;
        const response = yield (0, licitacion_1.calculoExcel)({ idLicitacion: licitacionId, filename: path });
        return res.status(200).send(response);
    }
    catch (e) {
        return (0, handleError_1.httpError)(res, e);
    }
});
exports.makeCalculoExcel = makeCalculoExcel;
