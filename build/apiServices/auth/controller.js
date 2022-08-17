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
exports.loginAdmin = exports.logoutProveedor = exports.confirmProveedorAccount = exports.logoutUsuario = exports.loginUsuario = exports.loginProveedor = void 0;
const handleError_1 = require("../../helpers/handleError");
const auth_1 = require("../../services/auth");
/* export const registerUsuario: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as UserRegisterFields
    const result = await registrarUsuarioService(fields)
    return res.status(200).send(result)
  } catch (err) {
    return httpError(res, err)
  }
} */
/* export const registerProveedor: RequestHandler = async (req, res) => {
  try {
    const fields = req.body as ProveedorRegisterFields
    const result = await registrarProveedorService(fields)
    if ('error' in result) return res.status(400).send(result)
    return res.status(200).send(result)
  } catch (err) {
    const error = err as Error
    return httpError(res, error)
  }
} */
const loginProveedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        const response = yield (0, auth_1.loginProveedorService)(fields);
        return res.status(200).send(response);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.loginProveedor = loginProveedor;
const loginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        const response = yield (0, auth_1.loginUsuarioService)(fields);
        return res.status(200).send(response);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.loginUsuario = loginUsuario;
/* export const confirmAccount: RequestHandler = async (req, res) => {
  try {
    const fields = req.body
    const result = await confirmAccountService(fields)
    return res.status(200).send(result)
  } catch (err) {
    return httpError(res, err)
  }
} */
const logoutUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const response = yield (0, auth_1.logoutUserService)(user._id);
        return res.status(200).send(response);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.logoutUsuario = logoutUsuario;
const confirmProveedorAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        const response = yield (0, auth_1.confirmProveedorService)(fields);
        return res.status(200).send(response);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.confirmProveedorAccount = confirmProveedorAccount;
const logoutProveedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedor = req.proveedor;
        const response = yield (0, auth_1.logoutProveedorService)(proveedor._id);
        return res.status(200).send(response);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.logoutProveedor = logoutProveedor;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        const response = yield (0, auth_1.loginAdminService)(fields);
        return res.status(200).send(response);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.loginAdmin = loginAdmin;
