"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemasApp = void 0;
const schemas_1 = require("./schemas");
exports.SchemasApp = {
    admin: schemas_1.AdminSchema,
    responseAdmin: schemas_1.ResponseAdminSchema,
    responseMessage: schemas_1.ResponseMessageSchema,
    responseCalculo: schemas_1.ResponseCalculoSchema,
    parametroName: schemas_1.ParametroNameSchema
};
