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
exports.insertMultipleParametrosDao = void 0;
const model_1 = __importDefault(require("../../apiServices/historial-parametros/model"));
const handleError_1 = require("../../helpers/handleError");
const insertMultipleParametrosDao = (parametros) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_1.default.collection.insertMany(parametros);
        return {
            message: 'Datos agregados exitosamente'
        };
    }
    catch (e) {
        console.log(e);
        const error = e;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error al agregar los parametros en la capa de datos');
    }
});
exports.insertMultipleParametrosDao = insertMultipleParametrosDao;