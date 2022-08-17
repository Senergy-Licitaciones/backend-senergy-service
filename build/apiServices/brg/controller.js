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
exports.addBrg = exports.getBrg = void 0;
const handleError_1 = require("../../helpers/handleError");
const brg_1 = require("../../services/brg");
const getBrg = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, brg_1.getBrgService)();
        return res.status(200).send(result);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.getBrg = getBrg;
const addBrg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        const response = yield (0, brg_1.addBrgService)(fields);
        return res.status(200).send(response);
    }
    catch (err) {
        return (0, handleError_1.httpError)(res, err);
    }
});
exports.addBrg = addBrg;
