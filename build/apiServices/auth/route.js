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
const validator_1 = require("../../middlewares/validator");
const router = express_1.default.Router();
router.put('/loginProveedor', controller_1.loginProveedor);
router.put('/loginUsuario', validator_1.validateUserLogin, controller_1.loginUsuario);
router.put('/loginAdmin', controller_1.loginAdmin);
/**
 * @swagger
 * /api/auth/loginAdmin:
 *  put:
 *      summary: "Login para Usuarios de tipo Administrativo"
 *      tags: [Authentication]
 *      description: "Endpoint para que un administrador pueda iniciar sesión"
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/loginRequest'
 *      responses:
 *          200:
 *              description: 'Proceso exitoso'
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/loginResponse'
 *          400:
 *              description: 'Errores durante el servicio'
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
 */
router.put('/logoutUsuario', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.User]), (0, roleAuth_1.default)([enums_1.Role.Basico, enums_1.Role.Premium]), controller_1.logoutUsuario);
router.put('/logoutProveedor', checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.Proveedor]), (0, roleAuth_1.default)([enums_1.Role.Basico, enums_1.Role.Premium]), controller_1.logoutProveedor);
// router.post('/registerProveedor', registerProveedor)
// router.post('/registerUsuario', validateUserRegister, registerUsuario)
// router.put('/confirmAccount', validateCode, confirmAccount)
router.put('/confirmProveedorAccount', controller_1.confirmProveedorAccount);
exports.default = router;
