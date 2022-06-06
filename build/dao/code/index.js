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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCodeDao = exports.verifyCodeDao = exports.createCodeDao = void 0;
const model_1 = __importDefault(require("../../apiServices/code/model"));
const handleError_1 = require("../../helpers/handleError");
const createCodeDao = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_1.default.create(fields);
        return {
            message: "Código creado exitosamente"
        };
    }
    catch (err) {
        console.log("error code dao ", err);
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de datos");
    }
});
exports.createCodeDao = createCodeDao;
const verifyCodeDao = (idUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield model_1.default.findOne({ user: idUser });
        if (!result)
            throw new Error("Código ya enviado");
        return {
            message: "Código por crear y enviar"
        };
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de datos");
    }
});
exports.verifyCodeDao = verifyCodeDao;
const removeCodeDao = (idUser, code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield model_1.default.findOneAndDelete({ user: idUser, code });
        console.log("response code ", response);
        if (!response)
            throw new Error("Código inválido");
        return {
            message: "Código validado exitosamente"
        };
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de datos");
    }
});
exports.removeCodeDao = removeCodeDao;
