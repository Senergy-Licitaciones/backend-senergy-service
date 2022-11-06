"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const schemas_group_1 = require("./schemas.group");
const swaggerDefinition = {
    openapi: '3.0.3',
    info: {
        title: 'Senergy - Licitaciones',
        version: '1.0.0',
        description: 'API para la Gestión de Licitaciones de Suministros de Energía Eléctrica'
    },
    servers: [{
            url: 'https://senergy-backend.herokuapp.com'
        }, {
            url: 'http://localhost:4000'
        }],
    externalDocs: {
        url: 'https://senergy-frontend.vercel.app/',
        description: 'Plataforma de Cliente'
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        },
        schemas: schemas_group_1.SchemasApp
    }
};
const swaggerOptions = {
    swaggerDefinition,
    apis: [`${path_1.default.join(__dirname, '../apiServices/*/route.ts')}`]
};
exports.default = (0, swagger_jsdoc_1.default)(swaggerOptions);
