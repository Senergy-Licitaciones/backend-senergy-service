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
exports.updateAdmin = exports.deleteAdmin = exports.getAdmins = exports.createAdminUser = void 0;
const handleError_1 = require("../../helpers/handleError");
const admin_1 = require("../../services/admin");
const createAdminUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        const response = yield (0, admin_1.createAdminService)(fields);
        return res.status(200).send(response);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.createAdminUser = createAdminUser;
const getAdmins = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield (0, admin_1.getAdminsService)();
        return res.status(200).send(admins);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.getAdmins = getAdmins;
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const response = yield (0, admin_1.deleteAdminService)(id);
        return res.status(200).send(response);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.deleteAdmin = deleteAdmin;
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        const id = req.params.id;
        const response = yield (0, admin_1.updateAdminService)({ fields, id });
        return res.status(200).send(response);
    }
    catch (e) {
        return (0, handleError_1.httpError)(res, e);
    }
});
exports.updateAdmin = updateAdmin;
