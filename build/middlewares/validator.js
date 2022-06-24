"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCode = exports.validateUserRegister = exports.validateUserLogin = void 0;
const express_validator_1 = require("express-validator");
const validateUserLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all([(0, express_validator_1.body)('correo').isEmail().isLength({ max: 32 }).run(req),
        (0, express_validator_1.body)('password').exists({ checkFalsy: true, checkNull: true }).isLength({ min: 8, max: 16 }).run(req)]);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            message: 'Datos inválidos',
            error: errors.array()
        });
    }
    return next();
});
exports.validateUserLogin = validateUserLogin;
const validateUserRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all([(0, express_validator_1.body)('correo').isEmail().isLength({ max: 32 }).run(req),
        (0, express_validator_1.body)('password').exists({ checkFalsy: true, checkNull: true }).isLength({ max: 16, min: 8 }).run(req),
        (0, express_validator_1.body)('empresa').exists({ checkFalsy: true, checkNull: true }).isLength({ max: 32 }).run(req),
        (0, express_validator_1.body)('ruc').exists({ checkFalsy: true, checkNull: true }).isLength({ max: 11, min: 11 }).run(req),
        (0, express_validator_1.body)('phone').isMobilePhone('es-PE').run(req),
        (0, express_validator_1.body)('address').exists({ checkFalsy: true, checkNull: true }).isLength({ max: 64 }).run(req)]);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            message: 'Datos inválidos',
            error: errors.array()
        });
    }
    return next();
});
exports.validateUserRegister = validateUserRegister;
const validateCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all([(0, express_validator_1.body)('code').exists({ checkFalsy: true, checkNull: true }).isLength({ min: 6, max: 6 }).run(req),
        (0, express_validator_1.body)('idUser').exists({ checkFalsy: true, checkNull: true }).isLength({ min: 24, max: 24 }).run(req)]);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            message: 'Datos inválidos',
            error: errors.array()
        });
    }
    return next();
});
exports.validateCode = validateCode;
