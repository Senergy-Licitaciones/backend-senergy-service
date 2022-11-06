"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseAdminSchema = void 0;
exports.ResponseAdminSchema = {
    type: 'object',
    properties: {
        _id: {
            type: 'string'
        },
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
        },
        createdAt: {
            type: 'string'
        },
        updatedAt: {
            type: 'string'
        }
    }
};
