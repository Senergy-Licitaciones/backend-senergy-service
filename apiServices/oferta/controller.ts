import { RequestHandler, RequestParamHandler } from "express";
import { httpError } from "../../helpers/handleError";
import { getOfertasService, getOfertaByIdService, updateOfertaService } from "../../services/oferta";

export const getOfertas:RequestHandler=async(req,res)=>{
    try{
        const proveedor=req.proveedor;
        if(!proveedor)throw new Error("Debe iniciar sesión primero");
        const ofertas=await getOfertasService(proveedor._id);
        if("error" in ofertas)return res.status(400).send(ofertas);
        return res.status(200).send(ofertas);
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}
export const getOfertaById:RequestHandler=async(req,res)=>{
    try{
        const ofertaId=req.ofertaId;
        if(!ofertaId)throw new Error("La oferta seleccionada no es válida");
        const oferta=await getOfertaByIdService(ofertaId);
        if("error" in oferta) return res.status(400).send(oferta);
        return res.status(200).send(oferta);
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}
export const ofertaId:RequestParamHandler=(req,_res,next,id)=>{
    req.ofertaId=id;
    next();
}
export const updateOferta:RequestHandler=async(req,res)=>{
    try{
        const ofertaId=req.ofertaId,
        fields=req.body;
        if(!ofertaId)throw new Error("La oferta seleccionada no es válida");
        const response=await updateOfertaService(ofertaId,fields);
        if("error" in response)return res.status(400).send(response);
        return res.status(200).send(response);
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}