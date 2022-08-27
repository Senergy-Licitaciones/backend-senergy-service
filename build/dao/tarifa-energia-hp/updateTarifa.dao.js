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
exports.updateTarifaDao = void 0;
const handleError_1 = require("../../helpers/handleError");
const model_1 = __importDefault(require("../../apiServices/tarifa-energia-hp/model"));
const updateTarifaDao = ({ id, valor, fecha }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('antes del await');
        const tarifa = yield model_1.default.findById(id);
        if (tarifa == null)
            throw new Error('No existe la tarifa');
        const result = tarifa.values.reduce((acc, curr, index) => {
            if (curr.fecha === fecha) {
                acc.values[index] = {
                    fecha,
                    value: valor
                };
                return {
                    isActual: true,
                    values: [...acc.values]
                };
            }
            if (index === tarifa.values.length - 1 && !acc.isActual) {
                return {
                    isActual: false,
                    values: [...acc.values, { fecha, value: valor }]
                };
            }
            return acc;
        }, { isActual: false, values: [...tarifa.values] });
        console.log(result);
        tarifa.values = result.values;
        yield tarifa.save();
    }
    catch (e) {
        console.log(e);
        throw (0, handleError_1.handleError)(e, 'Ha ocurrido un error al actualizar la tarifa');
    }
});
exports.updateTarifaDao = updateTarifaDao;
