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
const generateToken_1 = require("../helpers/generateToken");
const enums_1 = require("../types/data/enums");
const model_1 = __importDefault(require("../apiServices/admin/model"));
const model_2 = __importDefault(require("../apiServices/usuario/model"));
const model_3 = __importDefault(require("../apiServices/proveedor/model"));
const checkUserType = (types) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('iniciando check user type');
        const auth = req.headers.authorization;
        if (auth == null)
            throw new Error('Token no proporcionado');
        console.log('spliteando token');
        const token = auth.split(' ').pop();
        if (token == null)
            throw new Error('Token inválido');
        console.log('verificando token');
        const tokenData = (0, generateToken_1.verifyToken)(token);
        if (tokenData == null) {
            return res.status(409).send({
                message: 'Token inválido'
            });
        }
        console.log('type token ', tokenData.type, ' ', types.toString());
        if (types.includes(tokenData.type)) {
            if (tokenData.type === enums_1.Type.User) {
                const user = yield model_2.default.findById(tokenData._id);
                if (user == null)
                    return res.status(409).send({ message: 'Usuario sin permisos', error: true });
                // if (user.estado === 'offline') return res.status(400).send({ message: 'Debe iniciar sesión', error: true })
                req.user = user;
            }
            if (tokenData.type === enums_1.Type.Proveedor) {
                const proveedor = yield model_3.default.findById(tokenData._id);
                if (proveedor == null)
                    return res.status(409).send({ message: 'Usuario sin permisos' });
                req.proveedor = proveedor;
            }
            if (tokenData.type === enums_1.Type.Admin) {
                const admin = yield model_1.default.findById(tokenData._id);
                if (admin == null)
                    return res.status(409).send({ message: 'Cuenta no encontrada' });
                req.admin = admin;
            }
            console.log('antes del next en user type');
            return next();
        }
        console.log('else antes del res status en checkuser type');
        return res.status(409).send({
            message: 'No tiene permisos para realizar esta acción'
        });
    }
    catch (err) {
        console.log('error catch user type ', err);
        return res.status(500).send({ message: 'Ha ocurrido un error en la autenticación' });
    }
});
exports.default = checkUserType;
