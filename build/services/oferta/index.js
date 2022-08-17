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
exports.updateOfertaService = exports.getOfertaByIdService = exports.getOfertasService = void 0;
const oferta_1 = require("../../dao/oferta");
const handleError_1 = require("../../helpers/handleError");
const getOfertasService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ofertas = yield (0, oferta_1.getOfertasDao)(id);
        return ofertas;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.getOfertasService = getOfertasService;
const getOfertaByIdService = (ofertaId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oferta = yield (0, oferta_1.getOfertaByIdDao)(ofertaId);
        return oferta;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.getOfertaByIdService = getOfertaByIdService;
const updateOfertaService = ({ ofertaId, fields }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oferta = yield (0, oferta_1.updateOfertaDao)({ ofertaId, fields });
        return {
            message: `Oferta para ${oferta.licitacion.empresa} actualizada exitosamente `
        };
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.updateOfertaService = updateOfertaService;
