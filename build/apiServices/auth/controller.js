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
exports.loginAdmin = exports.logoutProveedor = exports.confirmProveedorAccount = exports.logoutUsuario = exports.confirmAccount = exports.loginUsuario = exports.loginProveedor = exports.registerProveedor = exports.registerUsuario = void 0;
const handleError_1 = require("../../helpers/handleError");
const auth_1 = require("../../services/auth");
const registerUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        const result = yield (0, auth_1.registrarUsuarioService)(fields);
        if ('error' in result)
            return res.status(400).send(result);
        return res.status(200).send(result);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.registerUsuario = registerUsuario;
const registerProveedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        const result = yield (0, auth_1.registrarProveedorService)(fields);
        if ('error' in result)
            return res.status(400).send(result);
        return res.status(200).send(result);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.registerProveedor = registerProveedor;
const loginProveedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        const response = yield (0, auth_1.loginProveedorService)(fields);
        if ('error' in response)
            return res.status(400).send(response);
        return res.status(200).send(response);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.loginProveedor = loginProveedor;
const loginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        const response = yield (0, auth_1.loginUsuarioService)(fields);
        if ('error' in response)
            return res.status(400).send(response);
        return res.status(200).send(response);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.loginUsuario = loginUsuario;
const confirmAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        const result = yield (0, auth_1.confirmAccountService)(fields);
        if ('error' in result)
            return res.status(400).send(result);
        return res.status(200).send(result);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.confirmAccount = confirmAccount;
const logoutUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const response = yield (0, auth_1.logoutUserService)(user._id);
        if ('error' in response)
            return res.status(400).send(response);
        return res.status(200).send(response);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.logoutUsuario = logoutUsuario;
const confirmProveedorAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        const response = yield (0, auth_1.confirmProveedorService)(fields);
        if ('error' in response)
            return res.status(400).send(response);
        return res.status(200).send(response);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.confirmProveedorAccount = confirmProveedorAccount;
const logoutProveedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedor = req.proveedor;
        const response = yield (0, auth_1.logoutProveedorService)(proveedor._id);
        if ('error' in response)
            return res.status(400).send(response);
        return res.status(200).send(response);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.logoutProveedor = logoutProveedor;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        const response = yield (0, auth_1.loginAdminService)(fields);
        if ('error' in response)
            return res.status(400).send(response);
        return res.status(200).send(response);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.loginAdmin = loginAdmin;
