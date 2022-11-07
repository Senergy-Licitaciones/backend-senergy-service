"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateParametersByDateSchemaRequest = void 0;
exports.UpdateParametersByDateSchemaRequest = {
    type: 'object',
    properties: {
        fecha: {
            type: 'string',
            example: '8-2022',
            description: 'El formato debe ser de la siguiente manera {Mes}-{Año}'
        },
        parametros: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    _id: {
                        type: 'string',
                        example: '631120f339bbb3cee9cb7ed6',
                        description: 'Id del parámetro'
                    },
                    value: {
                        type: 'number',
                        example: 221.493492,
                        description: 'Valor del parámetro'
                    }
                }
            }
        }
    }
};
