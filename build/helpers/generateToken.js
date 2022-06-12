"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.tokenSignProveedor = exports.tokenSignUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const enums_1 = require("../types/data/enums");
(0, dotenv_1.config)();
const tokenSignUser = (user) => {
    const usuario = user;
    return jsonwebtoken_1.default.sign({
        _id: usuario._id,
        correo: usuario.correo,
        role: usuario.role,
        type: enums_1.Type.User
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};
exports.tokenSignUser = tokenSignUser;
const tokenSignProveedor = (proveedor) => {
    const provider = proveedor;
    return jsonwebtoken_1.default.sign({
        _id: provider._id,
        razSocial: provider.razSocial,
        correo: provider.correo,
        ruc: provider.ruc,
        type: enums_1.Type.Proveedor
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
};
exports.tokenSignProveedor = tokenSignProveedor;
const verifyToken = (token) => {
    try {
        const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return data;
    }
    catch (err) {
        return null;
    }
};
exports.verifyToken = verifyToken;
