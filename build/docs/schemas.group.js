"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemasApp = void 0;
const schemas_1 = require("./schemas");
const requests_1 = require("./schemas/requests");
const responses_1 = require("./schemas/responses");
exports.SchemasApp = {
    admin: schemas_1.AdminSchema,
    responseAdmin: responses_1.ResponseAdminSchema,
    responseMessage: responses_1.ResponseMessageSchema,
    responseCalculo: responses_1.ResponseCalculoSchema,
    parametroName: schemas_1.ParametroNameSchema,
    updateParametersByDateRequest: requests_1.UpdateParametersByDateSchemaRequest
};
