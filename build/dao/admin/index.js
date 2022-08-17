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
exports.updateAdminDao = exports.deleteAdminDao = exports.getAdminsDao = exports.createAdminDao = exports.getAccountDao = void 0;
const handleError_1 = require("../../helpers/handleError");
const model_1 = __importDefault(require("../../apiServices/admin/model"));
const getAccountDao = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield model_1.default.findOne({ correo });
        if (admin == null)
            throw new Error('Cuenta no encontrada, credenciales incorrectas');
        return admin;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al obtener la cuenta de tipo Administrativo');
    }
});
exports.getAccountDao = getAccountDao;
const createAdminDao = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield model_1.default.create(fields);
        const response = yield admin.save();
        return response;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al crear un Administrador');
    }
});
exports.createAdminDao = createAdminDao;
const getAdminsDao = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield model_1.default.find();
        return admins;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al obtener la lista de administradores');
    }
});
exports.getAdminsDao = getAdminsDao;
const deleteAdminDao = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_1.default.findByIdAndDelete(id);
        return null;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al eliminar la cuenta de tipo Administrador');
    }
});
exports.deleteAdminDao = deleteAdminDao;
const updateAdminDao = ({ fields, id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield model_1.default.findByIdAndUpdate(id, fields, { new: true });
        if (admin == null)
            throw new Error('Cuenta no encontrada');
        return admin;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al actualizar la cuenta de tipo Administrador');
    }
});
exports.updateAdminDao = updateAdminDao;
