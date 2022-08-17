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
exports.addParametrosService = void 0;
const parametrosArray_adapter_1 = require("../../adapters/parametrosArray.adapter");
const historial_parametros_1 = require("../../dao/historial-parametros");
const handleError_1 = require("../../helpers/handleError");
const excel_1 = require("../excel");
const fs_1 = __importDefault(require("fs"));
const addParametrosService = ({ filename }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('iniciando método');
        const workbook = (0, excel_1.readExcelFile)(filename);
        const sheet = workbook.Sheets['Base de datos Factores'];
        const jsons = (0, excel_1.getJsonFromSheet)(sheet);
        const valuesArray = (0, parametrosArray_adapter_1.createParametrosArrayAdapter)(jsons);
        console.log('Hoja de excel', valuesArray);
        const response = yield (0, historial_parametros_1.insertMultipleParametrosDao)(valuesArray);
        fs_1.default.rmSync(filename);
        return response;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.addParametrosService = addParametrosService;
