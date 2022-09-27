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
exports.confirmCodeDao = exports.createCodeProveedorDao = void 0;
const handleError_1 = require("../../helpers/handleError");
const model_1 = __importDefault(require("../../apiServices/codeProveedor/model"));
/* CodeProveedorModel.watch().on('change', (change) => {
  if (change.operationType === 'delete') {
    const docKey = change.documentKey as {_id: string}
    const removeProveedorAccount = async (): Promise<void> => {
      try {
        const response = await ProveedorModel.findOneAndDelete({ codeToOCnfirm: docKey._id, verified: false })
        if (response === null) console.log('no existe la cuenta ', response)
        console.log('response ', response)
      } catch (err) {
        console.log('error ocurrido al eliminar cuenta de proveedor ', err)
      }
    }
    void removeProveedorAccount()
  }
}) */
const createCodeProveedorDao = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield model_1.default.create(fields);
        const code = yield response.save();
        return code;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un error al crear el código');
    }
});
exports.createCodeProveedorDao = createCodeProveedorDao;
const confirmCodeDao = ({ correo, code }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield model_1.default.findOne({ proveedor: correo, code });
        if (response == null)
            throw new Error('Código inválido');
        return response;
    }
    catch (err) {
        throw (0, handleError_1.handleError)(err, 'Ha ocurrido un erro al encontrar el código');
    }
});
exports.confirmCodeDao = confirmCodeDao;
