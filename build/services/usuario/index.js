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
exports.getLicitacionesByUser = exports.getUsersService = exports.changeStatusService = exports.getInfoUserService = void 0;
const mongoose_1 = require("mongoose");
const licitacion_1 = require("../../dao/licitacion");
const proveedor_1 = require("../../dao/proveedor");
const usuario_1 = require("../../dao/usuario");
const handleError_1 = require("../../helpers/handleError");
const enums_1 = require("../../types/form/enums");
const getInfoUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitaciones = yield (0, licitacion_1.getLicitacionesByUserDao)(user._id);
        if ('error' in licitaciones)
            return (0, handleError_1.handleError)(licitaciones.error, licitaciones.message);
        const numLicitaciones = licitaciones.length;
        const numParticipantes = licitaciones.map((li) => li.participantes.length).reduce((prev, current) => prev + current);
        const lastLicitacion = licitaciones.reduce((prev, current) => {
            return current.createdAt > prev.createdAt ? current : prev;
        });
        const oneParticipante = licitaciones.filter((li) => li.participantes.length === 1 && li.estado === enums_1.Estado.Cerrado);
        let lastProvider = '';
        let idLastProvider = new mongoose_1.Types.ObjectId();
        if (oneParticipante.length > 1) {
            idLastProvider = oneParticipante.reduce((prev, current) => current.createdAt > prev.createdAt ? current : prev).participantes[0]._id;
        }
        else {
            if (oneParticipante.length === 1) {
                idLastProvider = oneParticipante[0].participantes[0]._id;
                const response = yield (0, proveedor_1.getProveedorNameByIdDao)(idLastProvider);
                if ('error' in response)
                    return (0, handleError_1.handleError)(response.error, response.message);
                lastProvider = response.razSocial;
            }
            else {
                lastProvider = 'Sin Proveedor Actualmente';
            }
        }
        return {
            address: user.address,
            correo: user.correo,
            empresa: user.empresa,
            numLicitaciones,
            numParticipantes,
            lastLicitacion: {
                _id: lastLicitacion._id,
                fechaFinApertura: lastLicitacion.fechaFinApertura,
                fechaInicioapertura: lastLicitacion.fechaInicioApertura,
                participantes: lastLicitacion.participantes.length,
                ruc: user.ruc
            },
            lastProvider,
            phone: user.phone
        };
    }
    catch (err) {
        console.log('error ', err);
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error en la capa de servicios al obtener la información');
    }
});
exports.getInfoUserService = getInfoUserService;
const changeStatusService = ({ status, id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, licitacion_1.updateLicitacionDao)({ fields: { status }, id });
        if ('error' in result)
            (0, handleError_1.handleError)(result.error, result.message);
        return {
            message: 'Estado de la licitación actualizado'
        };
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.handleError)(error, 'Error en la capa de servicios');
    }
});
exports.changeStatusService = changeStatusService;
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usuario_1.getUsersDao)();
        if ('error' in users)
            return (0, handleError_1.handleError)(users.error, users.message);
        return users;
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error en la capa de servicios al obtener los usuarios');
    }
});
exports.getUsersService = getUsersService;
const getLicitacionesByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitaciones = yield (0, licitacion_1.getLicitacionesByUserDao)(id);
        if ('error' in licitaciones)
            return (0, handleError_1.handleError)(licitaciones.error, licitaciones.message);
        return licitaciones;
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error en la capa de servicios al obtener las licitacioens');
    }
});
exports.getLicitacionesByUser = getLicitacionesByUser;
