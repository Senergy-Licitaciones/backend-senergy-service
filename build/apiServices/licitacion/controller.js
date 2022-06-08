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
exports.licitacionId = exports.showLicitacionById = exports.showLicitacionesFree = exports.getTipos = exports.updateLicitacion = exports.createLicitacion = exports.showLicitaciones = void 0;
const handleError_1 = require("../../helpers/handleError");
const licitacion_1 = require("../../services/licitacion");
const showLicitaciones = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, licitacion_1.mostrarLicitacionesService)();
        if ("error" in result)
            return res.status(400).send(result);
        return res.status(200).send(result);
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.showLicitaciones = showLicitaciones;
const createLicitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = req.body;
        const result = yield (0, licitacion_1.crearLicitacionService)(fields);
        if ("error" in result)
            return res.status(400).send(result);
        return res.status(200).send(result);
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.createLicitacion = createLicitacion;
const updateLicitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fields, id } = req.body;
        const result = yield (0, licitacion_1.updateLicitacionService)({ fields, id });
        if ("error" in result)
            return res.status(400).send(result);
        return res.status(200).send(result);
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.updateLicitacion = updateLicitacion;
const getTipos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user)
            throw new Error("Debe iniciar sesión como usuario primero");
        const result = yield (0, licitacion_1.getTiposService)(user._id);
        if ("error" in result)
            return res.status(400).send(result);
        return res.status(200).send(result);
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.getTipos = getTipos;
/*export const showFile=(req,res)=>{
    try{
        const path=req.pathFilename;
        if(fs.readFileSync(path)){
            res.contentType("application/pdf");
            fs.createReadStream(path).pipe(res)
        }else{
            return res.send({
                message:"No existe el archivo"
            })
        }
    }catch(err){
        console.log("error",err);
        httpError(res,err);
    }
}
export const findFilename=(req,res,next,id)=>{
    req.pathFilename=`uploads/pdfs/${id}`;
    next();
}*/
const showLicitacionesFree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedor = req.proveedor;
        if (!proveedor)
            throw new Error("Debe iniciar sesión primero");
        const licitaciones = yield (0, licitacion_1.getLicitacionesFreeService)(proveedor._id);
        if ("error" in licitaciones)
            return res.status(400).send(licitaciones);
        return res.status(200).send(licitaciones);
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.showLicitacionesFree = showLicitacionesFree;
const showLicitacionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licitacionId = req.licitacionId;
        if (!licitacionId)
            throw new Error("Licitación no seleccionada");
        const licitacion = yield (0, licitacion_1.getLicitacionByIdService)(licitacionId);
        if ("error" in licitacion)
            return res.status(400).send(licitacion);
        return res.status(200).send(licitacion);
    }
    catch (err) {
        let error = err;
        return (0, handleError_1.httpError)(res, error);
    }
});
exports.showLicitacionById = showLicitacionById;
const licitacionId = (req, _res, next, id) => {
    req.licitacionId = id;
    next();
};
exports.licitacionId = licitacionId;
