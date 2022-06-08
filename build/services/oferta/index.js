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
        if ("error" in ofertas)
            return (0, handleError_1.handleError)(ofertas.error, ofertas.message);
        return ofertas;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de servicios al obtener las ofertas");
    }
});
exports.getOfertasService = getOfertasService;
const getOfertaByIdService = (ofertaId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oferta = yield (0, oferta_1.getOfertaByIdDao)(ofertaId);
        if ("error" in oferta)
            return (0, handleError_1.handleError)(oferta.error, oferta.message);
        return oferta;
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de servicios al obtener la oferta");
    }
});
exports.getOfertaByIdService = getOfertaByIdService;
const updateOfertaService = ({ ofertaId, fields }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oferta = yield (0, oferta_1.updateOfertaDao)({ ofertaId, fields });
        if ("error" in oferta)
            return (0, handleError_1.handleError)(oferta.error, oferta.message);
        return {
            message: `Oferta para ${oferta.licitacion.empresa} actualizada exitosamente `
        };
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.handleError)(error, "Ha ocurrido un error en la capa de servicios a actualizar la oferta");
    }
});
exports.updateOfertaService = updateOfertaService;
