"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSchema = void 0;
exports.AdminSchema = {
    type: 'object',
    required: ['name', 'correo', 'password', 'role'],
    properties: {
        name: {
            type: 'string'
        },
        correo: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
        role: {
            type: 'string',
            enum: ['jefe | empleado']
        }
    }
};
