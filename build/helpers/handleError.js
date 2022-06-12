"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.httpError = void 0;
const httpError = (res, error) => {
    return res.status(500).send({
        message: 'Ha ocurrido un error',
        error
    });
};
exports.httpError = httpError;
const handleError = (error, message) => {
    return {
        error,
        message
    };
};
exports.handleError = handleError;
