"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.httpError = void 0;
const httpError = (res, error) => {
    if (error.message == null)
        return res.status(500).send({ message: 'Ha ocurrido un error en el servidor' });
    const e = error;
    return res.status(400).send({
        message: e.message
    });
};
exports.httpError = httpError;
const handleError = (e, message) => {
    const error = e;
    return new Error(message != null ? message : error.message);
};
exports.handleError = handleError;
