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
exports.createProveedor = exports.showProveedores = exports.participarLicitacion = exports.getProveedoresToUser = exports.getInfoDashboardProveedor = void 0;
const handleError_1 = require("../../helpers/handleError");
const proveedor_1 = require("../../services/proveedor");
const getInfoDashboardProveedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedor = req.proveedor;
        const info = yield (0, proveedor_1.getInfoDashboardProveedorService)(proveedor);
        if ('error' in info)
            return res.status(400).send(info);
        return res.status(200).send(info);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.getInfoDashboardProveedor = getInfoDashboardProveedor;
const getProveedoresToUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedores = yield (0, proveedor_1.getProveedoresToUserService)();
        if ('error' in proveedores)
            return res.status(400).send(proveedores);
        return res.status(200).send(proveedores);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.getProveedoresToUser = getProveedoresToUser;
const participarLicitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedor = req.proveedor;
        const fields = req.body;
        const result = yield (0, proveedor_1.participarLicitacionService)({ fields, idProveedor: proveedor._id });
        if ('error' in result)
            return res.status(400).send(result);
        return res.status(200).send(result);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.participarLicitacion = participarLicitacion;
const showProveedores = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedores = yield (0, proveedor_1.getProveedoresService)();
        if ('error' in proveedores)
            return res.status(400).send(proveedores);
        return res.status(200).send(proveedores);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.showProveedores = showProveedores;
const createProveedor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        const response = yield (0, proveedor_1.createProveedorService)(fields);
        if ('error' in response)
            return res.status(400).send(response);
        return res.status(200).send(response);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.createProveedor = createProveedor;
