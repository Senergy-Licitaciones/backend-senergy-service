"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adapter = void 0;
const adapter = (cb) => (req, res, next) => {
    try {
        const body = req.body;
        const bodyParsed = cb(body);
        req.body = bodyParsed;
        return next();
    }
    catch (err) {
        console.log(err);
        return res.status(409).send({
            message: 'Ha ocurrido un error al adaptar la petición'
        });
    }
};
exports.adapter = adapter;
