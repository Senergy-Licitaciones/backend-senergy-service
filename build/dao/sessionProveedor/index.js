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
exports.logoutProveedorDao = exports.createSessionProveedor = void 0;
const handleError_1 = require("../../helpers/handleError");
const model_1 = __importDefault(require("../../apiServices/sessionProveedor/model"));
/* SessionProveedorModel.watch().on('change', (change) => {
  if (change.operationType === 'delete') {
    const docKey = change.documentKey as {_id: string}
    const closeSession = async (): Promise<void> => {
      await ProveedorModel.findOneAndUpdate({ session: docKey._id }, { estado: Estado.Offline, session: '' })
    }
    void closeSession()
  }
})
*/
const createSessionProveedor = ({ proveedorId, token }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield model_1.default.create({ proveedor: proveedorId, jwt: token });
        const session = yield response.save();
        return session;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al crear la sesión ');
    }
});
exports.createSessionProveedor = createSessionProveedor;
const logoutProveedorDao = (proveedorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedor = yield model_1.default.findOneAndDelete({ proveedor: proveedorId });
        if (proveedor == null)
            throw new Error('La sesión no existe');
        return proveedor;
    }
    catch (err) {
        console.log('error ', err);
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al eliminar la sesión');
    }
});
exports.logoutProveedorDao = logoutProveedorDao;
