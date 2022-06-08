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
exports.getUsersDao = exports.getUserDao = exports.getUserHashDao = exports.confirmUserDao = exports.updateUsuarioDao = exports.verifyCorreoDao = exports.crearUsuarioDao = void 0;
const handleError_1 = require("../../helpers/handleError");
const model_1 = __importDefault(require("../../apiServices/usuario/model"));
const crearUsuarioDao = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.default.create(Object.assign({}, fields));
        const response = yield user.save();
        return response;
    }
    catch (err) {
        console.log("error crear user dao ", err);
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de datos");
    }
});
exports.crearUsuarioDao = crearUsuarioDao;
const verifyCorreoDao = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield model_1.default.findOne({ correo });
        if (result)
            return { message: "Correo ya usado", _id: result._id };
        return {
            message: "Correo disponible"
        };
    }
    catch (err) {
        console.log("usuario dao ", err);
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de datos");
    }
});
exports.verifyCorreoDao = verifyCorreoDao;
const updateUsuarioDao = (fields, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield model_1.default.findByIdAndUpdate(id, Object.assign({}, fields), { new: true });
        return {
            message: `Usuario ${result.correo} actualizado correctamente`
        };
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de datos");
    }
});
exports.updateUsuarioDao = updateUsuarioDao;
const confirmUserDao = (idUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield model_1.default.findByIdAndUpdate(idUser, { estado: "offline" });
        if (!response)
            throw new Error("Usuario no encontrado");
        return {
            message: "Cuenta confirmada exitosamente"
        };
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de datos");
    }
});
exports.confirmUserDao = confirmUserDao;
const getUserHashDao = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield model_1.default.findOne({ correo }).select("password role correo");
        if (!response)
            throw new Error("Correo no registrado");
        return response;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de datos");
    }
});
exports.getUserHashDao = getUserHashDao;
const getUserDao = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.default.findOne({ correo, role: "admin" });
        if (!user)
            throw new Error("Usuario no encontrado");
        return user;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de datos al encontrar el usuario");
    }
});
exports.getUserDao = getUserDao;
const getUsersDao = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield model_1.default.find({
            $nor: [{ role: "admin" }]
        });
        return users;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de datos al obtener la lista de usuarios");
    }
});
exports.getUsersDao = getUsersDao;