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
exports.updateMultipleTarifasDao = void 0;
const handleError_1 = require("../../helpers/handleError");
const model_1 = __importDefault(require("../../apiServices/tarifa-potencia/model"));
const updateMultipleTarifasDao = (tarifas) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield model_1.default.find().select('name');
        const names = response.map((name) => name.name);
        yield model_1.default.bulkWrite(tarifas.map((tarifa) => {
            if (names.includes(tarifa.name)) {
                return {
                    updateOne: {
                        filter: { name: tarifa.name },
                        update: tarifa
                    }
                };
            }
            return {
                insertOne: {
                    document: tarifa
                }
            };
        }));
        //    await HistorialParametrosModel.collection.updateMany({}, parametros)
        return {
            message: 'Datos actualizados exitosamente'
        };
    }
    catch (e) {
        console.log(e);
        throw (0, handleError_1.handleError)(e, 'Ha ocurrido un error al actualizar los parametros en la capa de datos');
    }
});
exports.updateMultipleTarifasDao = updateMultipleTarifasDao;
