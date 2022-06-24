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
exports.logoutUserDao = exports.createSessionUser = void 0;
const model_1 = __importDefault(require("../../apiServices/sessionUser/model"));
const model_2 = __importDefault(require("../../apiServices/usuario/model"));
const handleError_1 = require("../../helpers/handleError");
const enums_1 = require("../../types/data/enums");
model_1.default.watch().on('change', (change) => {
    if (change.operationType === 'delete') {
        const docKey = change.documentKey;
        const closeSession = () => __awaiter(void 0, void 0, void 0, function* () {
            yield model_2.default.findOneAndUpdate({ sessionId: docKey._id }, { estado: enums_1.Estado.Offline, sessionId: null });
        });
        void closeSession();
    }
});
const createSessionUser = ({ idUser, token }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield model_1.default.create({ user: idUser, jwt: token });
        const session = yield response.save();
        return {
            message: 'Sesión creada exitosamente',
            _id: session._id
        };
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error al crear la sesión');
    }
});
exports.createSessionUser = createSessionUser;
const logoutUserDao = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield model_1.default.findOneAndDelete({ user: id });
        console.log('response ', response);
        return {
            message: 'Sesión cerrada exitosamente'
        };
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error al cerrar sesión con los datos');
    }
});
exports.logoutUserDao = logoutUserDao;
