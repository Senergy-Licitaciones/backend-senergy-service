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
exports.addUserController = exports.validateFile = exports.getEspecificacionMes = exports.filename = exports.generateFileToMonthsDetails = exports.getInfoUser = exports.showLicitaciones = exports.showUsers = exports.changeStatus = void 0;
const handleError_1 = require("../../helpers/handleError");
const usuario_1 = require("../../services/usuario");
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { estado, idLicitacion } = req.body;
        const result = yield (0, usuario_1.changeStatusService)({ status: estado, id: idLicitacion });
        return res.status(200).send(result);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.changeStatus = changeStatus;
const showUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usuario_1.getUsersService)();
        return res.status(200).send(users);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.showUsers = showUsers;
const showLicitaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const licitaciones = yield (0, usuario_1.getLicitacionesByUser)(user._id);
        return res.status(200).send(licitaciones);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.showLicitaciones = showLicitaciones;
const getInfoUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const info = yield (0, usuario_1.getInfoUserService)(user);
        return res.status(200).send(info);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.getInfoUser = getInfoUser;
const generateFileToMonthsDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { meses } = req.body;
        const user = req.user;
        const result = (0, usuario_1.generateFileToMonthsDetailsService)(meses, user);
        return res.status(200).send(result);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.generateFileToMonthsDetails = generateFileToMonthsDetails;
const filename = (req, _res, next, filename) => {
    req.filename = filename;
    next();
};
exports.filename = filename;
const getEspecificacionMes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.filename == null)
            return res.status(400).send({ message: 'No se ha especificado el archivo' });
        return res.status(200).download(`uploads/files/especificacion-mes-ut1/${req.filename}`);
    }
    catch (err) {
        console.log(err);
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.getEspecificacionMes = getEspecificacionMes;
const validateFile = (req, res) => {
    try {
        const file = req.file;
        if (file == null)
            return res.status(400).send({ message: 'No se ha subido ningún archivo' });
        const response = (0, usuario_1.validateFileService)(file.filename);
        return res.status(200).send(response);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
};
exports.validateFile = validateFile;
const addUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const response = yield (0, usuario_1.addUserService)(payload);
        return res.status(200).send(response);
    }
    catch (e) {
        return (0, handleError_1.httpError)(res, e);
    }
});
exports.addUserController = addUserController;
