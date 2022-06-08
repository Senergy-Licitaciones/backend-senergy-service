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
const generateToken_1 = require("../helpers/generateToken");
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const auth = req.headers.authorization;
        if (!auth)
            throw new Error("Token no ingresado");
        const token = auth.split(" ").pop();
        if (!token)
            throw new Error("Token inválido");
        const tokenData = (0, generateToken_1.verifyToken)(token);
        if (!tokenData._id)
            return res.status(409).send({ message: "No ha iniciado sesión", error: true });
        return next();
    }
    catch (err) {
        return res.status(409).send({
            message: "Ha ocurrido un error en el proceso de autenticación",
            error: err
        });
    }
});
exports.default = checkAuth;
