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
exports.updateTarifasService = void 0;
const adapters_1 = require("../../adapters");
const excel_1 = require("../excel");
const fs_1 = __importDefault(require("fs"));
const handleError_1 = require("../../helpers/handleError");
const tarifa_energia_hp_1 = require("../../dao/tarifa-energia-hp");
const updateTarifasService = ({ path }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workbook = (0, excel_1.readExcelFile)(path);
        const sheet = workbook.Sheets['Base de datos Tarifa Energía HP'];
        const jsons = (0, excel_1.getJsonFromSheet)(sheet);
        const valuesArray = (0, adapters_1.createTarifasArrayAdapter)(jsons);
        console.log('Hoja de excel', valuesArray);
        const response = yield (0, tarifa_energia_hp_1.updateMultipleTarifasDao)(valuesArray);
        fs_1.default.rmSync(path);
        return response;
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e);
    }
});
exports.updateTarifasService = updateTarifasService;
