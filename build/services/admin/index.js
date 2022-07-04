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
exports.getAdminsService = exports.createAdminService = void 0;
const admin_1 = require("../../dao/admin");
const handleBcrypt_1 = require("../../helpers/handleBcrypt");
const handleError_1 = require("../../helpers/handleError");
const createAdminService = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = yield (0, handleBcrypt_1.encrypt)(fields.password);
        if (typeof hash !== 'string')
            throw new Error(hash.message);
        const admin = yield (0, admin_1.createAdminDao)(Object.assign(Object.assign({}, fields), { password: hash }));
        if ('error' in admin)
            throw new Error(admin.message);
        return {
            message: `Cuenta ${admin.correo} creada exitosamente`
        };
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error al crear un Administrador en la capa de servicios');
    }
});
exports.createAdminService = createAdminService;
const getAdminsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield (0, admin_1.getAdminsDao)();
        if ('error' in admins)
            throw new Error(admins.message);
        return admins;
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error en la capa de servicios al obtener la lista de administradores');
    }
});
exports.getAdminsService = getAdminsService;
