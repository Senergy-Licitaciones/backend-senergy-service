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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdminService = exports.logoutProveedorService = exports.confirmProveedorService = exports.logoutUserService = exports.loginUsuarioService = exports.loginProveedorService = exports.registrarProveedorService = exports.confirmAccountService = exports.registrarUsuarioService = void 0;
const code_1 = require("../../dao/code");
const codeProveedor_1 = require("../../dao/codeProveedor");
const proveedor_1 = require("../../dao/proveedor");
const enums_1 = require("../../types/data/enums");
const sessionUser_1 = require("../../dao/sessionUser");
const sessionProveedor_1 = require("../../dao/sessionProveedor");
const usuario_1 = require("../../dao/usuario");
const generateToken_1 = require("../../helpers/generateToken");
const handleBcrypt_1 = require("../../helpers/handleBcrypt");
const handleError_1 = require("../../helpers/handleError");
const generateCode_1 = __importDefault(require("../../utils/generateCode"));
const emails_1 = require("../emails");
const registrarUsuarioService = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, password, empresa, ruc, web = "Sin Página Web", phone, address } = fields;
        const isFree = yield (0, usuario_1.verifyCorreoDao)(correo);
        if ("error" in isFree)
            return (0, handleError_1.handleError)(isFree.error, isFree.message);
        if ("_id" in isFree) {
            const result = yield (0, code_1.verifyCodeDao)(isFree._id);
            if ("error" in result)
                return (0, handleError_1.handleError)(result.error, result.message);
            const code = (0, generateCode_1.default)();
            const response = yield (0, emails_1.sendCodeVerification)({ code, correo });
            if ("error" in response)
                return (0, handleError_1.handleError)(response.error, response.message);
            const resultCode = yield (0, code_1.createCodeDao)({ code, user: isFree._id });
            if ("error" in resultCode)
                return (0, handleError_1.handleError)(resultCode.error, resultCode.message);
            return {
                idUser: isFree._id,
                message: "Cuenta por confirmar"
            };
        }
        console.log("primer condicional ");
        const code = (0, generateCode_1.default)();
        const response = yield (0, emails_1.sendCodeVerification)({ code, correo });
        if ("error" in response)
            return (0, handleError_1.handleError)(response.error, response.message);
        const hash = yield (0, handleBcrypt_1.encrypt)(password);
        if (typeof hash !== "string")
            throw new Error(hash.message);
        const user = yield (0, usuario_1.crearUsuarioDao)({ correo, password: hash, empresa, ruc, phone, address, web });
        if ("error" in user)
            return (0, handleError_1.handleError)(user.error, user.message);
        const resultCode = yield (0, code_1.createCodeDao)({ code, user: user._id });
        if ("error" in resultCode)
            return (0, handleError_1.handleError)(resultCode.error, resultCode.message);
        return {
            idUser: user._id,
            message: "Cuenta por confirmar"
        };
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de servicios");
    }
});
exports.registrarUsuarioService = registrarUsuarioService;
const confirmAccountService = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUser, code } = fields;
        const result = yield (0, code_1.removeCodeDao)({ idUser, code });
        if ("error" in result)
            return (0, handleError_1.handleError)(result.error, result.message);
        const response = yield (0, usuario_1.confirmUserDao)(idUser);
        if ("error" in response)
            return (0, handleError_1.handleError)(response.error, response.message);
        return {
            message: "Cuenta confirmada exitosamente"
        };
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de servicios");
    }
});
exports.confirmAccountService = confirmAccountService;
const registrarProveedorService = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exist = yield (0, proveedor_1.verifyCorreoProveedorDao)(fields.correo);
        if ("error" in exist)
            return (0, handleError_1.handleError)(exist.error, exist.message);
        const code = (0, generateCode_1.default)();
        const hash = yield (0, handleBcrypt_1.encrypt)(fields.password);
        if (typeof hash !== "string")
            throw new Error(hash.message);
        const response = yield (0, codeProveedor_1.createCodeProveedorDao)({ code, proveedor: fields.correo });
        if ("error" in response)
            return (0, handleError_1.handleError)(response.error, response.message);
        const proveedor = yield (0, proveedor_1.crearProveedorDao)(Object.assign(Object.assign({}, fields), { password: hash, codeToConfirm: response._id }));
        if ("error" in proveedor)
            return (0, handleError_1.handleError)(proveedor.error, proveedor.message);
        const result = yield (0, emails_1.sendCodeVerification)({ code, correo: fields.correo });
        if ("error" in result)
            return (0, handleError_1.handleError)(result.error, result.message);
        return {
            message: "Proveedor registrado esperando por confirmar",
            correo: proveedor.correo
        };
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de servicios");
    }
});
exports.registrarProveedorService = registrarProveedorService;
const loginProveedorService = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedor = yield (0, proveedor_1.proveedorEstadoDao)(fields.correo);
        console.log("proveedor ", proveedor);
        if ("error" in proveedor)
            return (0, handleError_1.handleError)(proveedor.error, proveedor.message);
        const isCorrect = yield (0, handleBcrypt_1.compare)({ password: fields.password, hash: proveedor.password });
        if (!isCorrect || typeof isCorrect !== "boolean")
            throw new Error("La contraseña es incorrecta");
        const token = (0, generateToken_1.tokenSignProveedor)(proveedor);
        const session = yield (0, sessionProveedor_1.createSessionProveedor)({ proveedorId: proveedor._id, token });
        console.log("session ", session);
        if ("error" in session)
            return (0, handleError_1.handleError)(session.error, session.message);
        const response = yield (0, proveedor_1.updateProveedorDao)({ fields: { estado: enums_1.Estado.Online, session: session._id }, id: proveedor._id });
        console.log("response ", response);
        if ("error" in response)
            return (0, handleError_1.handleError)(response.error, response.message);
        return {
            message: "Proveedor logeado exitosamente",
            token
        };
    }
    catch (err) {
        console.log("error ", err);
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de servicios");
    }
});
exports.loginProveedorService = loginProveedorService;
const loginUsuarioService = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, password } = fields;
        const user = yield (0, usuario_1.getUserHashDao)(correo);
        if ("error" in user)
            return (0, handleError_1.handleError)(user.error, user.message);
        const isCorrect = yield (0, handleBcrypt_1.compare)({ password, hash: user.password });
        if (!isCorrect || typeof isCorrect !== "boolean")
            throw new Error("La contraseña es incorrecta");
        const token = (0, generateToken_1.tokenSignUser)(user);
        const result = yield (0, sessionUser_1.createSessionUser)({ idUser: user._id, token });
        if ("error" in result)
            return (0, handleError_1.handleError)(result.error, result.message);
        console.log("session user ", result);
        const response = yield (0, usuario_1.updateUsuarioDao)({ fields: { estado: enums_1.Estado.Online, sessionId: `${result._id}` }, id: user._id });
        if ("error" in response)
            return (0, handleError_1.handleError)(response.error, response.message);
        console.log("update user ", response);
        return {
            message: "Usuario logeado exitosamente",
            token
        };
    }
    catch (err) {
        console.log("error catch service ", err);
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de servicios");
    }
});
exports.loginUsuarioService = loginUsuarioService;
const logoutUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, sessionUser_1.logoutUserDao)(id);
        if ("error" in response)
            return (0, handleError_1.handleError)(response.error, response.message);
        return response;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error al cerrar sesión");
    }
});
exports.logoutUserService = logoutUserService;
const confirmProveedorService = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, code } = fields;
        const response = yield (0, codeProveedor_1.confirmCodeDao)({ correo, code });
        if ("error" in response)
            return (0, handleError_1.handleError)(response.error, response.message);
        const result = yield (0, proveedor_1.confirmProveedorDao)(response._id);
        if ("error" in result)
            return (0, handleError_1.handleError)(result.error, result.message);
        console.log("response ", response, " result ", result);
        yield response.remove();
        return {
            message: "Cuenta de proveeedor confirmado"
        };
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error al intentar confirmar la cuenta");
    }
});
exports.confirmProveedorService = confirmProveedorService;
const logoutProveedorService = (proveedorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, sessionProveedor_1.logoutProveedorDao)(proveedorId);
        if ("error" in response)
            return (0, handleError_1.handleError)(response.error, response.message);
        return {
            message: "Sesión cerrada exitosamente"
        };
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error al cerrar la sesión");
    }
});
exports.logoutProveedorService = logoutProveedorService;
const loginAdminService = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, password } = fields;
        const user = yield (0, usuario_1.getUserDao)(correo);
        if ("error" in user)
            return (0, handleError_1.handleError)(user.error, user.message);
        const isCorrect = yield (0, handleBcrypt_1.compare)({ password, hash: user.password });
        if (!isCorrect || typeof isCorrect !== "boolean")
            throw new Error("Contraseña incorrecta");
        const token = (0, generateToken_1.tokenSignUser)(user);
        const result = yield (0, sessionUser_1.createSessionUser)({ idUser: user._id, token });
        if ("error" in result)
            return (0, handleError_1.handleError)(result.error, result.message);
        const response = yield (0, usuario_1.updateUsuarioDao)({ fields: { estado: enums_1.Estado.Online, sessionId: `${result._id}` }, id: user._id });
        if ("error" in response)
            return (0, handleError_1.handleError)(response.error, response.message);
        return {
            message: "Usuario admin logeado exitosamente",
            token
        };
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error al iniciar sesión");
    }
});
exports.loginAdminService = loginAdminService;
