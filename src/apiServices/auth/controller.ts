import { RequestHandler } from "express";
import { Document, Types } from "mongoose";
import { httpError } from "../../helpers/handleError";
import { registrarUsuarioService, registrarProveedorService, loginUsuarioService, loginProveedorService, confirmAccountService, logoutUserService, confirmProveedorService, logoutProveedorService, loginAdminService } from "../../services/auth";
import { Proveedor, User } from "../../types/data";
import { ConfirmProveedor, LoginFields, ProveedorRegisterFields, UserRegisterFields } from "../../types/form";

export const registerUsuario:RequestHandler=async(req,res)=>{
    try{
        const fields=req.body as UserRegisterFields ;
        const result=await registrarUsuarioService(fields);
        if("error" in result)return res.status(400).send(result);
        return res.status(200).send(result)
    }catch(err){ 
        let error=err as Error;
        return httpError(res,error);
    }
}
export const registerProveedor:RequestHandler=async(req,res)=>{
    try{
        const fields=req.body as ProveedorRegisterFields ;
        const result=await registrarProveedorService(fields);
        if("error" in result)return res.status(400).send(result);
        return res.status(200).send(result);
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}
export const loginProveedor:RequestHandler=async(req,res)=>{
    try{
        const fields=req.body;
        const response=await loginProveedorService(fields);
        if("error" in response)return res.status(400).send(response);
        return res.status(200).send(response);
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}
export const loginUsuario:RequestHandler=async(req,res)=>{
    try{
        const fields=req.body as LoginFields ;
        const response=await loginUsuarioService(fields);
        if("error" in response)return res.status(400).send(response);
        return res.status(200).send(response);
    }catch(err){
        return httpError(res,err as Error);
    }
}
export const confirmAccount:RequestHandler=async(req,res)=>{
    try{
        const fields=req.body;
        const result=await confirmAccountService(fields);
        if("error" in result)return res.status(400).send(result);
        return res.status(200).send(result);
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}
export const logoutUsuario:RequestHandler=async(req,res)=>{
    try{
        const user=req.user as Document<any, any, User> & User & {
    _id: Types.ObjectId};
        if(!user)throw new Error("Debe iniciar sesión para acceder a este recurso");
        const response=await logoutUserService(user._id);
        if("error" in response)return res.status(400).send(response);
        return res.status(200).send(response);
    }catch(err){
        let error=err as Error;
       return httpError(res,error);
    }
}
export const confirmProveedorAccount:RequestHandler=async(req,res)=>{
    try{
        const fields=req.body as ConfirmProveedor;
        const response=await confirmProveedorService(fields);
        if("error" in response) return res.status(400).send(response);
        return res.status(200).send(response);
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}
export const logoutProveedor:RequestHandler=async(req,res)=>{
    try{
        const proveedor=req.proveedor as Document<any, any, Proveedor> & Proveedor & {
    _id: Types.ObjectId} ;
        if(!proveedor)throw new Error("Debe iniciar sesión como proveedor para acceder a este recurso");
        const response=await logoutProveedorService(proveedor._id);
        if("error" in response) return res.status(400).send(response);
        return res.status(200).send(response);
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}
export const loginAdmin:RequestHandler=async(req,res)=>{
    try{
        const fields=req.body as LoginFields;
        const response=await loginAdminService(fields);
        if("error" in response)return res.status(400).send(response);
        return res.status(200).send(response);
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}