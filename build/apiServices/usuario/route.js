"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkAuth_1 = __importDefault(require("../../middlewares/checkAuth"));
const checkUserType_1 = __importDefault(require("../../middlewares/checkUserType"));
const uploadFileEspecificacion_1 = __importDefault(require("../../middlewares/filesUser/uploadFileEspecificacion"));
const roleAdminAuth_1 = require("../../middlewares/roleAdminAuth");
const roleAuth_1 = __importDefault(require("../../middlewares/roleAuth"));
const enums_1 = require("../../types/data/enums");
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.get('/getInfoDashboard', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.User]), (0, roleAuth_1.default)([enums_1.Role.Basico, enums_1.Role.Premium]), controller_1.getInfoUser);
router.post('/changeStatus', controller_1.changeStatus);
router.get('/getLicitaciones', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.User]), (0, roleAuth_1.default)([enums_1.Role.Basico, enums_1.Role.Premium]), controller_1.showLicitaciones);
router.get('/users', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Admin]), (0, roleAdminAuth_1.checkRoleAdminAuth)([enums_1.RoleAdmin.Employee, enums_1.RoleAdmin.Boss]), controller_1.showUsers);
router.post('/generate-file-to-months-details', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.User]), (0, roleAuth_1.default)([enums_1.Role.Basico, enums_1.Role.Premium]), controller_1.generateFileToMonthsDetails);
router.get('/download/especificacionMes/:filename', controller_1.getEspecificacionMes);
router.post('/validate-file/:filename', uploadFileEspecificacion_1.default, controller_1.validateFile);
router.post('/addUser', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Admin]), (0, roleAdminAuth_1.checkRoleAdminAuth)([enums_1.RoleAdmin.Employee, enums_1.RoleAdmin.Boss]), controller_1.addUserController);
router.param('filename', controller_1.filename);
exports.default = router;
