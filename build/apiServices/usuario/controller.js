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
exports.getInfoUser = exports.showLicitaciones = exports.showUsers = exports.changeStatus = void 0;
const handleError_1 = require("../../helpers/handleError");
const usuario_1 = require("../../services/usuario");
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { estado, idLicitacion } = req.body;
        const result = yield (0, usuario_1.changeStatusService)({ status: estado, id: idLicitacion });
        if ('error' in result)
            return res.send(result);
        return res.status(200).send(result);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.changeStatus = changeStatus;
const showUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usuario_1.getUsersService)();
        if ('error' in users)
            return res.status(400).send(users);
        return res.status(200).send(users);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.showUsers = showUsers;
const showLicitaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const licitaciones = yield (0, usuario_1.getLicitacionesByUser)(user._id);
        if ('error' in licitaciones)
            return res.status(400).send(licitaciones);
        return res.status(200).send(licitaciones);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.showLicitaciones = showLicitaciones;
const getInfoUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const info = yield (0, usuario_1.getInfoUserService)(user);
        if ('error' in info)
            return res.status(400).send(info);
        return res.status(200).send(info);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.getInfoUser = getInfoUser;
