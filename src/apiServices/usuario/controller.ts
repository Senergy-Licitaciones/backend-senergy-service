import { RequestHandler } from "express";
import {ObjectId, Types} from "mongoose";
import { httpError } from "../../helpers/handleError";
import { changeStatusService, getLicitacionesByUser, getUsersService } from "../../services/usuario";
import { DocType, User } from "../../types/data";
import { Estado } from "../../types/form/enums";

export const changeStatus:RequestHandler=async(req,res)=>{
    try{
        const {estado,idLicitacion}=req.body as {estado:Estado,idLicitacion:ObjectId};
        const result=await changeStatusService({status:estado,id:idLicitacion});
        if("error" in result)return res.send(result);
        return res.status(200).send(result)
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}
export const showUsers:RequestHandler=async(_req,res)=>{
    try{
        const users=await getUsersService();
        if("error" in users)return res.status(400).send(users);
        return res.status(200).send(users);
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}
export const showLicitaciones:RequestHandler=async(req,res)=>{
    try{
        const user=req.user as DocType<User>;
        const licitaciones=await getLicitacionesByUser(user._id);
        if("error" in licitaciones)return res.status(400).send(licitaciones);
        return res.status(200).send(licitaciones);
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}