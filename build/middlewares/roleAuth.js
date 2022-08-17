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
const checkRoleAuth = (roles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedor = req.proveedor;
        const user = req.user;
        if (proveedor != null) {
            return roles.includes(proveedor.role) ? next() : res.status(409).send({ message: 'Usuario sin permisos' });
        }
        ;
        if (user != null) {
            return roles.includes(user.role) ? next() : res.status(409).send({ message: 'Proveedor sin permisos' });
        }
        ;
        throw new Error('No tiene acceso a este recurso');
    }
    catch (err) {
        console.log('error role auth ', err);
        return res.status(500).send({
            message: 'Ha ocurrido un error en la autenticación'
        });
    }
});
exports.default = checkRoleAuth;
