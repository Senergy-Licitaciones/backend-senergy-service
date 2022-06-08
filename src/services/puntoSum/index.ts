import { getPuntoSumDao, createPuntoSumDao } from "../../dao/puntoSum";
import { handleError } from "../../helpers/handleError";
import { DocType, ErrorResponse, ResponseParent } from "../../types/data";
import { FieldsAdd } from "../../types/form";
import { Service, ServiceWithoutParam } from "../../types/methods";

export const getPuntoSumService:ServiceWithoutParam<ErrorResponse|Array<DocType<FieldsAdd>>>=async()=>{
    try{
        const result=await getPuntoSumDao();
        if("error" in result)return handleError(result.error,result.message);
        return result
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios");
    }
}
export const addPuntoSumService:Service<FieldsAdd,ErrorResponse|ResponseParent>=async(fields)=>{
    try{
        const response=await createPuntoSumDao(fields);
        return response;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios");
    }
}
