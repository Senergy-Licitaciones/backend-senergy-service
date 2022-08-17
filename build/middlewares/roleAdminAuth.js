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
exports.checkRoleAdminAuth = void 0;
const checkRoleAdminAuth = (roles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = req.admin;
        if (admin != null) {
            return roles.includes(admin.role) ? next() : res.status(409).send({ message: 'No cuenta con los permisos necesarios para realizar esta acción' });
        }
        throw new Error('No cuentas con los permisos para acceder a este recurso');
    }
    catch (err) {
        const error = err;
        return res.status(500).send({
            message: error.message
        });
    }
});
exports.checkRoleAdminAuth = checkRoleAdminAuth;
