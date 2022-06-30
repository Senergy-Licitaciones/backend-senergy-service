"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkAuth_1 = __importDefault(require("../../middlewares/checkAuth"));
const checkUserType_1 = __importDefault(require("../../middlewares/checkUserType"));
const roleAuth_1 = __importDefault(require("../../middlewares/roleAuth"));
const enums_1 = require("../../types/data/enums");
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.get('/showOfertas', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Proveedor]), (0, roleAuth_1.default)([enums_1.Role.Basico, enums_1.Role.Premium]), controller_1.getOfertas);
router.get('/ofertaById/:id', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Proveedor]), (0, roleAuth_1.default)([enums_1.Role.Basico, enums_1.Role.Premium]), controller_1.getOfertaById);
router.put('/editOferta/:id', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Proveedor]), (0, roleAuth_1.default)([enums_1.Role.Basico, enums_1.Role.Premium]), controller_1.updateOferta);
router.param('id', controller_1.ofertaId);
exports.default = router;
