import { httpError } from "../../helpers/handleError";
import { mostrarLicitacionesService, crearLicitacionService, updateLicitacionService, getTiposService, getLicitacionesFreeService, getLicitacionByIdService } from "../../services/licitacion";
//import { formatFileLicitacion } from "../../utils/nameFormat";
//import fs from "fs";
//import { sendEmails } from "../../services/emails";
import { RequestHandler, RequestParamHandler } from "express";
import { LicitacionRegisterFields } from "../../types/form";
import { Licitacion, Proveedor, User } from "../../types/data";
import { Document, ObjectId, Types } from "mongoose";
export const showLicitaciones:RequestHandler=async(_req,res)=>{
    try{
        const result=await mostrarLicitacionesService();
        if("error" in result)return res.status(400).send(result);
        return res.status(200).send(result);
    }catch(err){
        let error=err as Error;
        return httpError(res,error)
    }
}
export const createLicitacion:RequestHandler=async(req,res)=>{
    try{
        const fields=req.body as LicitacionRegisterFields;
        const result=await crearLicitacionService(fields);
        if("error" in result)return res.status(400).send(result);
        return res.status(200).send(result)
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}
export const updateLicitacion:RequestHandler=async(req,res)=>{
    try{
        const {fields,id}=req.body as {fields:Partial<Licitacion>,id:ObjectId} ;
        const result=await updateLicitacionService({fields,id});
        if("error" in result)return res.status(400).send(result);
        return res.status(200).send(result);
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}
export const getTipos:RequestHandler=async(req,res)=>{
    try{
        const user=req.user as Document<any, any, User> & User & {
            _id: Types.ObjectId};
        if(!user)throw new Error("Debe iniciar sesión como usuario primero")
        const result=await getTiposService(user._id);
        if("error" in result) return res.status(400).send(result);
        return res.status(200).send(result);
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}
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
export const showLicitacionesFree:RequestHandler=async(req,res)=>{
    try{
        const proveedor=req.proveedor as Document<any, any, Proveedor> & Proveedor & {
    _id: Types.ObjectId};
        if(!proveedor) throw new Error("Debe iniciar sesión primero");
        const licitaciones=await getLicitacionesFreeService(proveedor._id);
        if("error" in licitaciones)return res.status(400).send(licitaciones);
        return res.status(200).send(licitaciones);
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}
export const showLicitacionById:RequestHandler=async(req,res)=>{
    try{
        const licitacionId=req.licitacionId as ObjectId;
        if(!licitacionId) throw new Error("Licitación no seleccionada");
        const licitacion=await getLicitacionByIdService(licitacionId);
        if("error" in licitacion)return res.status(400).send(licitacion);
        return res.status(200).send(licitacion);
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}
export const licitacionId:RequestParamHandler=(req,_res,next,id)=>{
    req.licitacionId=id;
    next();
}