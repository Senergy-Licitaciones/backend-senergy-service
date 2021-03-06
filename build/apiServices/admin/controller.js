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
exports.getAdmins = exports.createAdminUser = void 0;
const handleError_1 = require("../../helpers/handleError");
const admin_1 = require("../../services/admin");
const createAdminUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        const response = yield (0, admin_1.createAdminService)(fields);
        if ('error' in response)
            return res.status(400).send(response);
        return res.status(200).send(response);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.createAdminUser = createAdminUser;
const getAdmins = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield (0, admin_1.getAdminsService)();
        if ('error' in admins)
            return res.status(400).send(admins);
        return res.status(200).send(admins);
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.getAdmins = getAdmins;
