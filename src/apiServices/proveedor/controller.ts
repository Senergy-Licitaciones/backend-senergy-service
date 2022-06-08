import { RequestHandler } from "express";
import { Document, Types } from "mongoose";
import { httpError } from "../../helpers/handleError";
import { participarLicitacionService, getProveedoresService } from "../../services/proveedor";
import { Oferta, Proveedor } from "../../types/data";

export const participarLicitacion:RequestHandler=async(req,res)=>{
    try{
        const proveedor=req.proveedor as Document<any, any, Proveedor> & Proveedor & {
            _id: Types.ObjectId};
        if(!proveedor)throw new Error("Debe iniciar sesión como proveedor primero");
        const fields=req.body as Oferta;
        const result=await participarLicitacionService({fields,idProveedor:proveedor._id});
        if("error" in result)return res.status(400).send(result);
        return res.status(200).send(result);
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}
export const showProveedores:RequestHandler=async(_req,res)=>{
    try{
        const proveedores=await getProveedoresService();
        if("error" in proveedores)return res.status(400).send(proveedores);
        return res.status(200).send(proveedores);
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}