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
exports.getProveedoresDao = exports.proveedorEstadoDao = exports.confirmProveedorDao = exports.verifyCorreoProveedorDao = exports.updateProveedorDao = exports.crearProveedorDao = void 0;
const handleError_1 = require("../../helpers/handleError");
const model_1 = __importDefault(require("../../apiServices/proveedor/model"));
const crearProveedorDao = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield model_1.default.create(Object.assign({}, fields));
        const proveedor = yield response.save();
        return proveedor;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de datos");
    }
});
exports.crearProveedorDao = crearProveedorDao;
const updateProveedorDao = (fields, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield model_1.default.findByIdAndUpdate(id, Object.assign({}, fields), { new: true });
        if (!result)
            throw new Error("Cuenta inexistente");
        return result;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de datos");
    }
});
exports.updateProveedorDao = updateProveedorDao;
const verifyCorreoProveedorDao = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield model_1.default.findOne({ correo });
        if (response)
            throw new Error("Correo ya usado");
        return {
            message: "Correo disponible"
        };
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error al verificar el correo");
    }
});
exports.verifyCorreoProveedorDao = verifyCorreoProveedorDao;
const confirmProveedorDao = (idCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield model_1.default.findOneAndUpdate({
            codeToConfirm: idCode,
            verified: false
        }, { codeToConfirm: null,
            verified: true
        }, { new: true });
        if (!response)
            throw new Error("No se pudo encontrar la cuenta a confirmar");
        return response;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la actualizacion del proveedor");
    }
});
exports.confirmProveedorDao = confirmProveedorDao;
const proveedorEstadoDao = (correo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedor = yield model_1.default.findOne({ correo, verified: true, estado: "offline" });
        if (!proveedor)
            throw new Error("Los datos son inválidos");
        return proveedor;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error al verificar la cuenta");
    }
});
exports.proveedorEstadoDao = proveedorEstadoDao;
const getProveedoresDao = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedores = yield model_1.default.find();
        return proveedores;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de datos al listar los proveedores");
    }
});
exports.getProveedoresDao = getProveedoresDao;
