import { RequestHandler } from "express";
import { httpError } from "../../helpers/handleError";
import { getPuntoSumService, addPuntoSumService } from "../../services/puntoSum";
import { FieldsAdd } from "../../types/form";

export const getPuntoSum:RequestHandler=async(_req,res)=>{
    try{
        const result=await getPuntoSumService();
        if("error" in result)return res.status(400).send(result);
        return res.status(200).send(result)
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}
export const addPuntoSum:RequestHandler=async(req,res)=>{
    try{
        const fields=req.body as FieldsAdd;
        const response=await addPuntoSumService(fields);
        if("error" in response)return res.status(400).send({message:response.message,error:response.error});
        return res.status(200).send(response);
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}