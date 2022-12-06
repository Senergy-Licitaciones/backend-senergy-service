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
exports.addUserService = exports.validateFileService = exports.generateFileToMonthsDetailsService = exports.getLicitacionesByUser = exports.getUsersService = exports.changeStatusService = exports.getInfoUserService = void 0;
const mongoose_1 = require("mongoose");
const licitacion_1 = require("../../dao/licitacion");
const proveedor_1 = require("../../dao/proveedor");
const usuario_1 = require("../../dao/usuario");
const handleError_1 = require("../../helpers/handleError");
const enums_1 = require("../../types/form/enums");
const xlsx_1 = __importDefault(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
const getInfoUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitaciones = yield (0, licitacion_1.getLicitacionesByUserDao)(user._id);
        const numLicitaciones = licitaciones.length;
        const numParticipantes = licitaciones.length > 1 ? licitaciones.map((li) => li.participantes.length).reduce((prev, current) => prev + current) : 0;
        const lastLicitacion = licitaciones.length > 0
            ? licitaciones.reduce((prev, current) => {
                return current.createdAt > prev.createdAt ? current : prev;
            })
            : 'Ninguna Licitación generada hasta el momento';
        const responseLastLicitacion = typeof lastLicitacion === 'string'
            ? { message: lastLicitacion }
            : {
                _id: lastLicitacion._id,
                fechaFinApertura: lastLicitacion.fechaFinApertura,
                fechaInicioapertura: lastLicitacion.fechaInicioApertura,
                participantes: lastLicitacion.participantes.length,
                ruc: user.ruc
            };
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
                lastProvider = response.razSocial;
            }
            else {
                lastProvider = 'Sin Proveedor Actualmente';
            }
        }
        return {
            address: user.address,
            correo: user.correo,
            empresa: typeof lastLicitacion !== 'string' ? lastLicitacion.empresa : user.empresa,
            numLicitaciones,
            numParticipantes,
            lastLicitacion: responseLastLicitacion,
            lastProvider,
            phone: user.phone
        };
    }
    catch (err) {
        console.log('error ', err);
        throw (0, handleError_1.handleError)(err);
    }
});
exports.getInfoUserService = getInfoUserService;
const changeStatusService = ({ status, id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, licitacion_1.updateLicitacionDao)({ fields: { status }, id });
        return {
            message: 'Estado de la licitación actualizado'
        };
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.changeStatusService = changeStatusService;
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, usuario_1.getUsersDao)();
        return users;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.getUsersService = getUsersService;
const getLicitacionesByUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitaciones = yield (0, licitacion_1.getLicitacionesByUserDao)(id);
        return licitaciones;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
});
exports.getLicitacionesByUser = getLicitacionesByUser;
const generateFileToMonthsDetailsService = (meses, user) => {
    try {
        const workbook = xlsx_1.default.utils.book_new();
        const worksheet = xlsx_1.default.utils.json_to_sheet(meses);
        xlsx_1.default.utils.book_append_sheet(workbook, worksheet, 'Meses');
        const filename = `${user.ruc}_${user._id}_${new Date().getTime()}.xlsx`;
        xlsx_1.default.writeFile(workbook, `uploads/files/especificacion-mes-ut1/${filename}`);
        return {
            filename
        };
    }
    catch (err) {
        console.log('error', err);
        throw (0, handleError_1.handleError)(err);
    }
};
exports.generateFileToMonthsDetailsService = generateFileToMonthsDetailsService;
const validateFileService = (filename) => {
    try {
        const workbook = xlsx_1.default.readFile(`uploads/files/especificacion-mes-ut1/${filename}`);
        const sheet = workbook.Sheets.Meses;
        const meses = xlsx_1.default.utils.sheet_to_json(sheet);
        fs_1.default.rmSync(`uploads/files/especificacion-mes-ut1/${filename}`);
        return meses;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err);
    }
};
exports.validateFileService = validateFileService;
const addUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, usuario_1.createUserDao)(payload);
        return response;
    }
    catch (e) {
        throw (0, handleError_1.handleError)(e);
    }
});
exports.addUserService = addUserService;
