"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAdminResponseSchema = void 0;
exports.LoginAdminResponseSchema = {
    type: 'object',
    properties: {
        token: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        },
        message: {
            type: 'string',
            example: 'Usuario logeado exitosamente'
        }
    }
};
