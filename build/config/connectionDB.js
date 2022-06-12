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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const connectionDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const URL_DB = process.env.URL_DB;
        yield mongoose_1.default.connect(URL_DB);
        console.log('Conectado a la DB');
    }
    catch (err) {
        console.log('Ha ocurrido un error al conectarse a la DB ', err);
    }
});
exports.connectionDB = connectionDB;
