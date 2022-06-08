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
exports.compare = exports.encrypt = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const handleError_1 = require("./handleError");
const encrypt = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = yield bcryptjs_1.default.hash(password, 10);
        return hash;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error al momento de encriptar la contraseña");
    }
});
exports.encrypt = encrypt;
const compare = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, hash } = fields;
        const res = yield bcryptjs_1.default.compare(password, hash);
        return res;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error al verificar la contraseña");
    }
});
exports.compare = compare;
