import { RequestHandler } from "express";
import { httpError } from "../../helpers/handleError";
import { getBrgService, addBrgService } from "../../services/brg";
import { FieldsAdd } from "../../types/form";

export const getBrg:RequestHandler=async(_req,res)=>{
    try{
        const result=await getBrgService();
        if("error" in result)return res.status(400).send(result);
        return res.status(200).send(result);
    }catch(err){
        let error=err as Error;
        return httpError(res,error)
    }
}
export const addBrg:RequestHandler=async(req,res)=>{
    try{
        const fields=req.body as FieldsAdd ;
        const response=await addBrgService(fields);
        if("error" in response)return res.status(400).send(response);
        return res.status(200).send(response);
    }catch(err){
        let error=err as Error;
        return httpError(res,error);
    }
}