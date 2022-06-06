import { getPuntoSumDao, createPuntoSumDao } from "../../dao/puntoSum";
import { handleError } from "../../helpers/handleError";
import { ErrorResponse } from "../../types/data";
import { FieldsAdd } from "../../types/form";

export const getPuntoSumService=async()=>{
    try{
        const result=await getPuntoSumDao();
        if("error" in result)return handleError(result.error,result.message);
        return result
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios");
    }
}
export const addPuntoSumService=async(fields:FieldsAdd):Promise<ErrorResponse|Pick<ErrorResponse,"message">>=>{
    try{
        const response=await createPuntoSumDao(fields);
        return response;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios");
    }
}
