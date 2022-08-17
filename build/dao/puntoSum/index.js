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
exports.createPuntoSumDao = exports.getPuntoSumDao = void 0;
const handleError_1 = require("../../helpers/handleError");
const model_1 = __importDefault(require("../../apiServices/puntoSum/model"));
const getPuntoSumDao = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield model_1.default.find();
        return result;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al obtener los puntos de suministro');
    }
});
exports.getPuntoSumDao = getPuntoSumDao;
const createPuntoSumDao = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield model_1.default.create({ name: fields.name });
        const puntoSum = yield response.save();
        return {
            message: `Punto de suministro ${puntoSum.name} agregado exitosamente`
        };
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al crear un nuevo punto de suministro');
    }
});
exports.createPuntoSumDao = createPuntoSumDao;
