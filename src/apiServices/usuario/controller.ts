import { RequestHandler } from "express";
import { ObjectId } from "mongoose";
import { httpError } from "../../helpers/handleError";
import { changeStatusService, getUsersService } from "../../services/usuario";
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