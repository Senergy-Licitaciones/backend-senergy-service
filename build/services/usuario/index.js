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
exports.getUsersService = exports.changeStatusService = void 0;
const licitacion_1 = require("../../dao/licitacion");
const usuario_1 = require("../../dao/usuario");
const handleError_1 = require("../../helpers/handleError");
const changeStatusService = (status, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, licitacion_1.updateLicitacionDao)({ status }, id);
        if (result.error)
            (0, handleError_1.handleError)(result.error, result.message);
        return {
            message: "Estado de la licitación actualizado"
        };
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Error en la capa de servicios");
    }
});
exports.changeStatusService = changeStatusService;
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usuario_1.getUsersDao)();
        if ("error" in users)
            return (0, handleError_1.handleError)(users.error, users.message);
        return users;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de servicios al obtener los usuarios");
    }
});
exports.getUsersService = getUsersService;
