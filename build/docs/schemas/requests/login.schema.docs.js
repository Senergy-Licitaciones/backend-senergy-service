"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRequestSchema = void 0;
exports.LoginRequestSchema = {
    type: 'object',
    properties: {
        correo: {
            type: 'string',
            example: 'admin@senergy.com'
        },
        password: {
            type: 'string',
            example: '12345678'
        }
    }
};
