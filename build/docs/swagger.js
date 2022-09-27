"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: '3.0.3',
    info: {
        title: 'Senergy - Licitaciones',
        version: '1.0.0',
        description: 'API para la Gestión de Licitaciones de Suministros de Energía Eléctrica'
    },
    servers: [{
            url: 'https://senergy-backend.herokuapp.com/api'
        }, {
            url: 'http://localhost:4000/api'
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
        schemas: {
            admin: {
                type: 'object',
                required: ['name', 'correo', 'password', 'role'],
                properties: {
                    name: {
                        type: 'string',
                        correo: 'string',
                        password: 'string',
                        role: 'jefe | empleado'
                    }
                }
            },
            responseMessage: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    }
                }
            }
        }
    }
};
const swaggerOptions = {
    swaggerDefinition,
    apis: ['../apiServices/admin/route.ts']
};
exports.default = (0, swagger_jsdoc_1.default)(swaggerOptions);
