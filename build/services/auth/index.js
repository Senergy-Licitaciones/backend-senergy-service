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
exports.loginAdminService = exports.logoutProveedorService = exports.confirmProveedorService = exports.logoutUserService = exports.loginUsuarioService = exports.loginProveedorService = void 0;
const codeProveedor_1 = require("../../dao/codeProveedor");
const proveedor_1 = require("../../dao/proveedor");
const sessionUser_1 = require("../../dao/sessionUser");
const sessionProveedor_1 = require("../../dao/sessionProveedor");
const usuario_1 = require("../../dao/usuario");
const generateToken_1 = require("../../helpers/generateToken");
const handleBcrypt_1 = require("../../helpers/handleBcrypt");
const handleError_1 = require("../../helpers/handleError");
const admin_1 = require("../../dao/admin");
/* export const registrarUsuarioService: Service<UserRegisterFields, ResponseRegisterUser> = async (fields) => {
  try {
    const { correo, password, empresa, ruc, web = 'Sin Página Web', phone, address } = fields
    const isFree = await verifyCorreoDao(correo)
    if ('error' in isFree) return handleError(isFree.error, isFree.message)
    if ('_id' in isFree) {
      const result = await verifyCodeDao(isFree._id)
      if ('error' in result) return handleError(result.error, result.message)
      const code = generateCode()
      const response = await sendCodeVerification({ code, correo })
      if ('error' in response) return handleError(response.error, response.message)
      const resultCode = await createCodeDao({ code, user: isFree._id })
      if ('error' in resultCode) return handleError(resultCode.error, resultCode.message)
      return {
        idUser: isFree._id,
        message: 'Cuenta por confirmar'
      }
    }
    console.log('primer condicional ')
    const code = generateCode()
    const response = await sendCodeVerification({ code, correo })
    if ('error' in response) return handleError(response.error, response.message)
    const hash = await encrypt(password)
    if (typeof hash !== 'string') throw new Error(hash.message)
    const user = await crearUsuarioDao({ correo, password: hash, empresa, ruc, phone, address, web })
    if ('error' in user) return handleError(user.error, user.message)
    const resultCode = await createCodeDao({ code, user: user._id })
    if ('error' in resultCode) return handleError(resultCode.error, resultCode.message)
    return {
      idUser: user._id,
      message: 'Cuenta por confirmar'
    }
  } catch (err) {
    throw handleError(err)
  }
} */
/* export const confirmAccountService: Service<ConfirmAccount, ResponseParent|ErrorResponse> = async (fields) => {
  try {
    const { idUser, code } = fields
    const result = await removeCodeDao({ idUser, code })
    if ('error' in result) return handleError(result.error, result.message)
    const response = await confirmUserDao(idUser)
    if ('error' in response) return handleError(response.error, response.message)
    return {
      message: 'Cuenta confirmada exitosamente'
    }
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de servicios')
  }
} */
/* export const registrarProveedorService: Service<ProveedorRegisterFields, ErrorResponse|ResponseParent & {correo: string}> = async (fields) => {
  try {
    const exist = await verifyCorreoProveedorDao(fields.correo)
    if ('error' in exist) return handleError(exist.error, exist.message)
    const code = generateCode()
    const hash = await encrypt(fields.password)
    if (typeof hash !== 'string') throw new Error(hash.message)
    const response = await createCodeProveedorDao({ code, proveedor: fields.correo })
    if ('error' in response) return handleError(response.error, response.message)
    const proveedor = await crearProveedorDao({ ...fields, password: hash, codeToConfirm: response._id })
    if ('error' in proveedor) return handleError(proveedor.error, proveedor.message)
    const result = await sendCodeVerification({ code, correo: fields.correo })
    if ('error' in result) return handleError(result.error, result.message)
    return {
      message: 'Proveedor registrado esperando por confirmar',
      correo: proveedor.correo
    }
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error en la capa de servicios')
  }
} */
const loginProveedorService = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedor = yield (0, proveedor_1.proveedorEstadoDao)(fields.correo);
        console.log('proveedor ', proveedor);
        const isCorrect = yield (0, handleBcrypt_1.compare)({ password: fields.password, hash: proveedor.password });
        if (!isCorrect)
            throw new Error('La contraseña es incorrecta');
        const token = (0, generateToken_1.tokenSignProveedor)(proveedor);
        /* const session = await createSessionProveedor({ proveedorId: proveedor._id, token })
        console.log('session ', session)
        if ('error' in session) return handleError(session.error, session.message)
        const response = await updateProveedorDao({ fields: { estado: Estado.Online, session: session._id }, id: proveedor._id })
        console.log('response ', response)
        if ('error' in response) return handleError(response.error, response.message) */
        return {
            message: 'Proveedor logeado exitosamente',
            token
        };
    }
    catch (err) {
        console.log('error ', err);
        throw (0, handleError_1.handleError)(err);
    }
});
exports.loginProveedorService = loginProveedorService;
const loginUsuarioService = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, password } = fields;
        const user = yield (0, usuario_1.getUserHashDao)(correo);
        const isCorrect = yield (0, handleBcrypt_1.compare)({ password, hash: user.password });
        if (!isCorrect)
            throw new Error('La contraseña es incorrecta');
        const token = (0, generateToken_1.tokenSignUser)(user);
        /* const result = await createSessionUser({ idUser: user._id, token })
        if ('error' in result) return handleError(result.error, result.message)
        console.log('session user ', result)
        const response = await updateUsuarioDao({ fields: { estado: Estado.Online, sessionId: result._id.toString() }, id: user._id })
        if ('error' in response) return handleError(response.error, response.message)
        console.log('update user ', response) */
        return {
            message: 'Usuario logeado exitosamente',
            token
        };
    }
    catch (err) {
        console.log('error catch service ', err);
        throw (0, handleError_1.handleError)(err);
    }
});
exports.loginUsuarioService = loginUsuarioService;
const logoutUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, sessionUser_1.logoutUserDao)(id);
        return response;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.logoutUserService = logoutUserService;
const confirmProveedorService = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, code } = fields;
        const response = yield (0, codeProveedor_1.confirmCodeDao)({ correo, code });
        const result = yield (0, proveedor_1.confirmProveedorDao)(response._id);
        console.log('response ', response, ' result ', result);
        yield response.remove();
        return {
            message: 'Cuenta de proveeedor confirmado'
        };
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.confirmProveedorService = confirmProveedorService;
const logoutProveedorService = (proveedorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, sessionProveedor_1.logoutProveedorDao)(proveedorId);
        return {
            message: 'Sesión cerrada exitosamente'
        };
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.logoutProveedorService = logoutProveedorService;
const loginAdminService = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, password } = fields;
        const admin = yield (0, admin_1.getAccountDao)(correo);
        const isCorrect = yield (0, handleBcrypt_1.compare)({ password, hash: admin.password });
        if (!isCorrect)
            throw new Error('Contraseña incorrecta');
        const token = (0, generateToken_1.tokenSignAdmin)(admin);
        return {
            message: 'Usuario admin logeado exitosamente',
            token
        };
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al iniciar sesión');
    }
});
exports.loginAdminService = loginAdminService;
