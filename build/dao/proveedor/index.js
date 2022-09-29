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
exports.createProveedorDao = exports.getProveedoresDao = exports.proveedorEstadoDao = exports.confirmProveedorDao = exports.verifyCorreoProveedorDao = exports.updateProveedorDao = exports.getProveedorNameByIdDao = exports.getProveedoresToUserDao = exports.crearProveedorDao = void 0;
const handleError_1 = require("../../helpers/handleError");
const model_1 = __importDefault(require("../../apiServices/proveedor/model"));
const crearProveedorDao = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield model_1.default.create(Object.assign({}, fields));
        const proveedor = yield response.save();
        return proveedor;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al registrar un nuevo proveedor');
    }
});
exports.crearProveedorDao = crearProveedorDao;
const getProveedoresToUserDao = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield model_1.default.find().select('createdAt updatedAt correo razSocial ruc web address phone1');
        return response;
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e, 'Ha ocurrido un error al obtener la información de los generadores');
    }
});
exports.getProveedoresToUserDao = getProveedoresToUserDao;
const getProveedorNameByIdDao = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedor = yield model_1.default.findById(id).select('razSocial ruc');
        if (proveedor == null)
            throw new Error('Proveedor no encontrado');
        return {
            razSocial: proveedor.razSocial,
            ruc: proveedor.ruc
        };
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error en la capa de datos al obtener el nombre del proveedor');
    }
});
exports.getProveedorNameByIdDao = getProveedorNameByIdDao;
const updateProveedorDao = ({ fields, id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield model_1.default.findByIdAndUpdate(id, Object.assign({}, fields), { new: true });
        if (result == null)
            throw new Error('Cuenta inexistente');
        return result;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al actualizar el proveedor');
    }
});
exports.updateProveedorDao = updateProveedorDao;
const verifyCorreoProveedorDao = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield model_1.default.findOne({ correo });
        if (response != null)
            throw new Error('Correo ya usado');
        return {
            message: 'Correo disponible'
        };
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al verificar el correo');
    }
});
exports.verifyCorreoProveedorDao = verifyCorreoProveedorDao;
const confirmProveedorDao = (idCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield model_1.default.findOneAndUpdate({
            codeToConfirm: idCode,
            verified: false
        }, {
            codeToConfirm: null,
            verified: true
        }, { new: true });
        if (response == null)
            throw new Error('No se pudo encontrar la cuenta a confirmar');
        return response;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al confirmar la cuenta del proveedor');
    }
});
exports.confirmProveedorDao = confirmProveedorDao;
const proveedorEstadoDao = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedor = yield model_1.default.findOne({ correo, verified: true /* estado: Estado.Offline */ });
        if (proveedor == null)
            throw new Error('Los datos son inválidos');
        return proveedor;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al verificar la cuenta');
    }
});
exports.proveedorEstadoDao = proveedorEstadoDao;
const getProveedoresDao = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedores = yield model_1.default.find().select('razSocial ruc role createdAt updatedAt correo phone1');
        return proveedores;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error en la capa de datos al listar los proveedores');
    }
});
exports.getProveedoresDao = getProveedoresDao;
const createProveedorDao = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedor = yield model_1.default.create(fields);
        const response = yield proveedor.save();
        return response;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al crear el proveedor de energía eléctrica en la capa de datos');
    }
});
exports.createProveedorDao = createProveedorDao;
