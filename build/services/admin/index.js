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
exports.updateAdminService = exports.deleteAdminService = exports.getAdminsService = exports.createAdminService = void 0;
const admin_1 = require("../../dao/admin");
const handleBcrypt_1 = require("../../helpers/handleBcrypt");
const handleError_1 = require("../../helpers/handleError");
const createAdminService = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = yield (0, handleBcrypt_1.encrypt)(fields.password);
        const admin = yield (0, admin_1.createAdminDao)(Object.assign(Object.assign({}, fields), { password: hash }));
        return {
            message: `Cuenta ${admin.correo} creada exitosamente`
        };
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.createAdminService = createAdminService;
const getAdminsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield (0, admin_1.getAdminsDao)();
        return admins;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.getAdminsService = getAdminsService;
const deleteAdminService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, admin_1.deleteAdminDao)(id);
        return {
            message: 'Cuenta eliminada exitosamente'
        };
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.deleteAdminService = deleteAdminService;
const updateAdminService = ({ fields, id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield (0, admin_1.updateAdminDao)({ id, fields });
        return {
            message: `Cuenta ${admin.correo} actualizada exitosamente`
        };
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.updateAdminService = updateAdminService;
