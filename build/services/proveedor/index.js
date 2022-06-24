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
exports.getProveedoresService = exports.participarLicitacionService = exports.getProveedoresToUserService = void 0;
const licitacion_1 = require("../../dao/licitacion");
const oferta_1 = require("../../dao/oferta");
const proveedor_1 = require("../../dao/proveedor");
const handleError_1 = require("../../helpers/handleError");
const getProveedoresToUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedores = yield (0, proveedor_1.getProveedoresToUserDao)();
        if ('error' in proveedores)
            return (0, handleError_1.handleError)(proveedores.error, proveedores.message);
        return proveedores;
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error al obtener los proveedores en la capa de servicios');
    }
});
exports.getProveedoresToUserService = getProveedoresToUserService;
const participarLicitacionService = ({ fields, idProveedor }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { potencia, energiaHp, energiaHfp, potenciaFacturar, formulaIndexPotencia, formulaIndexEnergia, potMinFacturable, licitacion, excesoPotencia, excesoEnergiaHp, excesoEnergiaHfp } = fields;
        const oferta = yield (0, oferta_1.crearOfertaDao)({ potencia, energiaHfp, energiaHp, potenciaFacturar, formulaIndexPotencia, formulaIndexEnergia, potMinFacturable, excesoPotencia, proveedor: idProveedor, licitacion, excesoEnergiaHp, excesoEnergiaHfp });
        if ('error' in oferta)
            return (0, handleError_1.handleError)(oferta.error, oferta.message);
        const result = yield (0, licitacion_1.updateLicitacionDao)({ fields: { $push: { participantes: idProveedor } }, id: licitacion });
        if ('error' in result)
            return (0, handleError_1.handleError)(result.error, result.message);
        const proveedor = yield (0, proveedor_1.updateProveedorDao)({ fields: { $push: { licitaciones: licitacion } }, id: idProveedor });
        if ('error' in proveedor)
            return (0, handleError_1.handleError)(proveedor.error, proveedor.message);
        return {
            message: 'Se ha inscrito en la licitación exitosamente'
        };
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error en la capa de servicios');
    }
});
exports.participarLicitacionService = participarLicitacionService;
const getProveedoresService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedores = yield (0, proveedor_1.getProveedoresDao)();
        if ('error' in proveedores)
            return (0, handleError_1.handleError)(proveedores.error, proveedores.message);
        return proveedores;
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error en la capa de servicios al listar los proveedores');
    }
});
exports.getProveedoresService = getProveedoresService;
