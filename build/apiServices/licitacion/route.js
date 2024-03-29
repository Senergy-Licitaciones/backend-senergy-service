"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkAuth_1 = __importDefault(require("../../middlewares/checkAuth"));
const checkUserType_1 = __importDefault(require("../../middlewares/checkUserType"));
const uploadParametros_1 = __importDefault(require("../../middlewares/filesUser/uploadParametros"));
const roleAdminAuth_1 = require("../../middlewares/roleAdminAuth");
// import { upload } from "../../middlewares/filesLicitacion/uploadFile";
const roleAuth_1 = __importDefault(require("../../middlewares/roleAuth"));
const enums_1 = require("../../types/data/enums");
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.get('/licitaciones', controller_1.showLicitaciones);
router.get('/calculo/:id', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Admin]), (0, roleAdminAuth_1.checkRoleAdminAuth)([enums_1.RoleAdmin.Employee, enums_1.RoleAdmin.Boss]), controller_1.makeCalculo);
/**
 * @swagger
 *  /api/licitacion/calculo/{id}:
 *  get:
 *      summary: "Precios proyectados y Generador ganador del cálculo"
 *      description: "Realiza el cálculo de los precios para las ofertas dadas para una Licitación"
 *      tags: [Licitación]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: "Id de la Licitación"
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/responseCalculo'
 */
router.post('/calculoExcel/:id', uploadParametros_1.default, checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Admin]), (0, roleAdminAuth_1.checkRoleAdminAuth)([enums_1.RoleAdmin.Boss, enums_1.RoleAdmin.Employee]), controller_1.makeCalculoExcel);
router.get('/showLicitaciones', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Admin]), (0, roleAdminAuth_1.checkRoleAdminAuth)([enums_1.RoleAdmin.Employee, enums_1.RoleAdmin.Boss]), controller_1.getLicitaciones);
router.get('/licitacionId/:id', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Proveedor, enums_1.Type.User]), (0, roleAuth_1.default)([enums_1.Role.Basico, enums_1.Role.Premium]), controller_1.showLicitacionById);
router.get('/licitacionesLibres', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Proveedor]), (0, roleAuth_1.default)([enums_1.Role.Basico, enums_1.Role.Premium]), controller_1.showLicitacionesFree);
router.post('/crearLicitacion', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.User]), (0, roleAuth_1.default)([enums_1.Role.Basico, enums_1.Role.Premium]), controller_1.createLicitacion);
router.put('/actualizarLicitacion/:id', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.User]), (0, roleAuth_1.default)([enums_1.Role.Basico, enums_1.Role.Premium]), controller_1.updateLicitacion);
router.get('/tipoLicitaciones', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.User]), (0, roleAuth_1.default)([enums_1.Role.Basico, enums_1.Role.Premium]), controller_1.getTipos);
// router.get("/file/:filename",showFile);
// router.param("filename",findFilename);
router.param('id', controller_1.licitacionId);
exports.default = router;
