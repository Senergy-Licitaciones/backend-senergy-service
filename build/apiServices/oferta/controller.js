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
exports.updateOferta = exports.ofertaId = exports.getOfertaById = exports.getOfertas = void 0;
const handleError_1 = require("../../helpers/handleError");
const oferta_1 = require("../../services/oferta");
const getOfertas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedor = req.proveedor;
        if (!proveedor)
            throw new Error("Debe iniciar sesión primero");
        const ofertas = yield (0, oferta_1.getOfertasService)(proveedor._id);
        if ("error" in ofertas)
            return res.status(400).send(ofertas);
        return res.status(200).send(ofertas);
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.getOfertas = getOfertas;
const getOfertaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ofertaId = req.ofertaId;
        if (!ofertaId)
            throw new Error("La oferta seleccionada no es válida");
        const oferta = yield (0, oferta_1.getOfertaByIdService)(ofertaId);
        if ("error" in oferta)
            return res.status(400).send(oferta);
        return res.status(200).send(oferta);
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.getOfertaById = getOfertaById;
const ofertaId = (req, _res, next, id) => {
    req.ofertaId = id;
    next();
};
exports.ofertaId = ofertaId;
const updateOferta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ofertaId = req.ofertaId, fields = req.body;
        if (!ofertaId)
            throw new Error("La oferta seleccionada no es válida");
        const response = yield (0, oferta_1.updateOfertaService)({ ofertaId, fields });
        if ("error" in response)
            return res.status(400).send(response);
        return res.status(200).send(response);
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.updateOferta = updateOferta;
