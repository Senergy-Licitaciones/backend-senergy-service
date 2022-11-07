"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adapters_1 = require("../../adapters");
const middlewares_1 = require("../../middlewares");
const checkAuth_1 = __importDefault(require("../../middlewares/checkAuth"));
const checkUserType_1 = __importDefault(require("../../middlewares/checkUserType"));
const uploadParametros_1 = __importDefault(require("../../middlewares/filesUser/uploadParametros"));
const roleAdminAuth_1 = require("../../middlewares/roleAdminAuth");
const roleAuth_1 = __importDefault(require("../../middlewares/roleAuth"));
const enums_1 = require("../../types/data/enums");
const controller_1 = require("./controller");
const router = express_1.default.Router();
// router.post('/addParametro', checkAuth, checkUserType([Type.Admin]), checkRoleAdminAuth([RoleAdmin.Employee, RoleAdmin.Boss]), addParametro)
router.post('/exportFile', (0, middlewares_1.adapter)(adapters_1.createExportFileDates), checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Admin]), (0, roleAdminAuth_1.checkRoleAdminAuth)([enums_1.RoleAdmin.Employee, enums_1.RoleAdmin.Boss]), controller_1.exportFile);
router.delete('/deleteParametros', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Admin]), (0, roleAdminAuth_1.checkRoleAdminAuth)([enums_1.RoleAdmin.Boss]), controller_1.deleteParametros);
router.get('/downloadFile/:filename', controller_1.downloadFile);
router.post('/exportFileToUpdate', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Admin]), (0, roleAdminAuth_1.checkRoleAdminAuth)([enums_1.RoleAdmin.Boss, enums_1.RoleAdmin.Employee]), controller_1.exportFileToUpdate);
router.post('/proyecciones/exportFile/:idLicitacion', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Admin]), (0, roleAdminAuth_1.checkRoleAdminAuth)([enums_1.RoleAdmin.Boss, enums_1.RoleAdmin.Employee]), controller_1.exportProyeccionFile);
router.param('filename', controller_1.getFilename);
router.post('/addParametros/:filename', uploadParametros_1.default, checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Admin]), (0, roleAdminAuth_1.checkRoleAdminAuth)([enums_1.RoleAdmin.Employee, enums_1.RoleAdmin.Boss]), controller_1.addParametros);
router.put('/updateParametros/:filename', uploadParametros_1.default, checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Admin]), (0, roleAdminAuth_1.checkRoleAdminAuth)([enums_1.RoleAdmin.Employee, enums_1.RoleAdmin.Boss]), controller_1.updateParametros);
router.put('/updateParametro/:idParametro', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Admin]), (0, roleAdminAuth_1.checkRoleAdminAuth)([enums_1.RoleAdmin.Employee, enums_1.RoleAdmin.Boss]), controller_1.updateParametro);
/**
 * @swagger
 * /api/historial-parametros/updateParametro/{idParametro}:
 *  put:
 *      summary: "Actualizar un único parámetro de acuerdo a un valor y a una fecha"
 *      tags: [Historial de Parámetros Base]
 *      description: "Endpoint para actualizar un parámetro mediante su id y proporcionando una fecha y un valor para esa fecha"
 *      parameters:
 *          - in: path
 *            name: idParametro
 *            schema:
 *              type: string
 *            required: true
 *            description: "Id del Parámetro"
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/updateParameterByIdRequest'
 *      responses:
 *          200:
 *              description: 'Proceso exitoso'
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/responseMessage'
 *          400:
 *              description: 'Errores durante el servicio'
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/responseMessage'
 *          409:
 *              description: 'Usuario no autenticado'
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/responseMessage'
 *          500:
 *              description: 'Conexión de DB o servicios externos perdidos'
 *              content:
 *                  application/json:
 *                       schema:
 *                          $ref: '#components/schemas/responseMessage'
 *      security:
 *          - bearerAuth: []
 */
router.put('/updateParametrosByDate', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Admin]), (0, roleAdminAuth_1.checkRoleAdminAuth)([enums_1.RoleAdmin.Employee, enums_1.RoleAdmin.Boss]), controller_1.updateParametrosByDate);
/**
 * @swagger
 * /api/historial-parametros/updateParametrosByDate:
 *  put:
 *      summary: "Actualizar Parámetros Base por Fecha"
 *      tags: [Historial de Parámetros Base]
 *      description: "Endpoint para actualizar parámetros base de una nueva fecha"
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/updateParametersByDateRequest'
 *      responses:
 *          200:
 *              description: 'Proceso exitoso'
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/responseMessage'
 *          400:
 *              description: 'Errores durante el servicio'
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/responseMessage'
 *          409:
 *              description: 'Usuario no autenticado'
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/responseMessage'
 *          500:
 *              description: 'Conexión de DB o servicios externos perdidos'
 *              content:
 *                  application/json:
 *                       schema:
 *                          $ref: '#components/schemas/responseMessage'
 *      security:
 *          - bearerAuth: []
 */
router.get('/getParametros', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Admin]), (0, roleAdminAuth_1.checkRoleAdminAuth)([enums_1.RoleAdmin.Employee, enums_1.RoleAdmin.Boss]), controller_1.getParametros);
router.get('/getNames', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Proveedor]), (0, roleAuth_1.default)([enums_1.Role.Basico, enums_1.Role.Premium]), controller_1.getNames);
/**
 * @swagger
 * /api/historial-parametros/getNames:
 *  get:
 *      summary: "Nombres de Parámetros"
 *      tags: [Historial de Parámetros Base]
 *      description: "Lista de Nombres de Parámetros ocupados por el Generador al enviar su oferta"
 *      responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/parametroName'
 *      security:
 *          - bearerAuth: []
 */
exports.default = router;
