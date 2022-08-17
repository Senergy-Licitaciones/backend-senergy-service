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
exports.createProveedorService = exports.getProveedoresService = exports.getInfoDashboardProveedorService = exports.participarLicitacionService = exports.getProveedoresToUserService = void 0;
const licitacion_1 = require("../../dao/licitacion");
const oferta_1 = require("../../dao/oferta");
const proveedor_1 = require("../../dao/proveedor");
const handleBcrypt_1 = require("../../helpers/handleBcrypt");
const handleError_1 = require("../../helpers/handleError");
const calcTime_1 = __importDefault(require("../../utils/calcTime"));
const dateFormat_1 = require("../../utils/dateFormat");
const getProveedoresToUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedores = yield (0, proveedor_1.getProveedoresToUserDao)();
        return proveedores;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.getProveedoresToUserService = getProveedoresToUserService;
const participarLicitacionService = ({ fields, idProveedor }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { potencia, energiaHp, energiaHfp, potenciaFacturar, formulaIndexPotencia, formulaIndexEnergia, potMinFacturable, licitacion, excesoPotencia, excesoEnergiaHp, excesoEnergiaHfp, tarifaEnergiaHfp, tarifaPotencia, tarifaEnergiaHp } = fields;
        yield (0, oferta_1.crearOfertaDao)({
            potencia,
            energiaHfp,
            energiaHp,
            potenciaFacturar,
            formulaIndexPotencia,
            formulaIndexEnergia,
            potMinFacturable,
            excesoPotencia,
            proveedor: idProveedor,
            licitacion,
            excesoEnergiaHp,
            excesoEnergiaHfp,
            tarifaPotencia,
            tarifaEnergiaHfp,
            tarifaEnergiaHp
        });
        yield (0, licitacion_1.updateLicitacionDao)({ fields: { $push: { participantes: idProveedor } }, id: licitacion });
        yield (0, proveedor_1.updateProveedorDao)({ fields: { $push: { licitaciones: licitacion } }, id: idProveedor });
        return {
            message: 'Se ha inscrito en la licitación exitosamente'
        };
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.participarLicitacionService = participarLicitacionService;
const getInfoDashboardProveedorService = (proveedor) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitaciones = yield (0, licitacion_1.getLicitacionesToProveedorDashboardDao)(proveedor._id);
        if (licitaciones.length === 0) {
            return {
                numOfertas: 0,
                numLicitaciones: 0,
                plan: proveedor.role,
                timeToExpireLic: 'No existen licitaciones',
                ofertas: [],
                licitaciones: []
            };
        }
        const fechaActual = new Date(Date.now());
        const licitacionToExpire = licitaciones.reduce((prev, current) => {
            const currentDate = (0, dateFormat_1.formatFromStringToDate)(current.fechaFinApertura);
            const prevDate = (0, dateFormat_1.formatFromStringToDate)(prev.fechaFinApertura);
            return currentDate.getTime() - fechaActual.getTime() < prevDate.getTime() - fechaActual.getTime() ? current : prev;
        });
        console.log('licitacionToExpire', licitacionToExpire);
        const ofertas = yield (0, oferta_1.getOfertasToProveedorDashboardDao)(proveedor._id);
        return {
            numOfertas: proveedor.licitaciones.length,
            numLicitaciones: licitaciones.length,
            plan: proveedor.role,
            timeToExpireLic: (0, calcTime_1.default)((0, dateFormat_1.formatFromStringToDate)(licitacionToExpire.fechaFinApertura), fechaActual),
            ofertas: ofertas.map((el) => ({ participantes: el.licitacion.participantes.length, fechaInicio: el.createdAt, fechaFin: (0, dateFormat_1.formatFromStringToDate)(el.licitacion.fechaInicio), empresa: el.licitacion.empresa })),
            licitaciones: licitaciones.map((li) => ({ fechaInicioApertura: (0, dateFormat_1.formatFromStringToDate)(li.fechaInicioApertura), fechaFinApertura: (0, dateFormat_1.formatFromStringToDate)(li.fechaFinApertura), empresa: li.empresa, participantes: li.participantes.length }))
        };
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.getInfoDashboardProveedorService = getInfoDashboardProveedorService;
const getProveedoresService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedores = yield (0, proveedor_1.getProveedoresDao)();
        return proveedores;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.getProveedoresService = getProveedoresService;
const createProveedorService = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = yield (0, handleBcrypt_1.encrypt)(fields.password);
        const proveedor = yield (0, proveedor_1.createProveedorDao)(Object.assign(Object.assign({}, fields), { password: hash }));
        return {
            message: `Cuenta ${proveedor.correo} registrada exitosamente`
        };
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.createProveedorService = createProveedorService;
