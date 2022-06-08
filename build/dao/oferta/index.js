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
exports.updateOfertaDao = exports.getOfertaByIdDao = exports.getOfertasDao = exports.crearOfertaDao = void 0;
const model_1 = __importDefault(require("../../apiServices/oferta/model"));
const handleError_1 = require("../../helpers/handleError");
const crearOfertaDao = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("fields ", fields);
        const oferta = yield model_1.default.create(fields);
        const result = yield oferta.save();
        console.log("oferta: ", oferta);
        console.log("result ", result);
        return result;
    }
    catch (err) {
        console.log("error ", err);
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de datos al crear la oferta");
    }
});
exports.crearOfertaDao = crearOfertaDao;
const getOfertasDao = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ofertas = yield model_1.default.find({
            proveedor: id
        }).populate("licitacion");
        return ofertas;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de datos al obtener las ofertas");
    }
});
exports.getOfertasDao = getOfertasDao;
const getOfertaByIdDao = (ofertaId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oferta = yield model_1.default.findById(ofertaId);
        if (!oferta)
            throw new Error("No eexiste la oferta seleccionada");
        return oferta;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de datos al obtener la oferta");
    }
});
exports.getOfertaByIdDao = getOfertaByIdDao;
const updateOfertaDao = ({ ofertaId, fields }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = Date.now();
        let oferta = yield model_1.default.findById(ofertaId).populate("licitacion");
        if (!oferta)
            throw new Error("La oferta seleccionada no existe");
        if (new Date(oferta.licitacion.fechaFinApertura).getMilliseconds() > date)
            throw new Error("El plazo de tiempo para modificar esta oferta ya culminó");
        const result = yield oferta.update(fields);
        console.log("Result update ", result);
        return oferta;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de datos al actualizar la oferta");
    }
});
exports.updateOfertaDao = updateOfertaDao;
