import { getBrgDao, createBrgDao } from "../../dao/brg";
import { handleError } from "../../helpers/handleError";
import { FieldsAdd } from "../../types/form";

export const getBrgService=async()=>{
    try{
        const result=await getBrgDao();
        if("error" in result)return handleError(result.error,result.message);
        return result
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios");
    }
}
export const addBrgService=async(fields:FieldsAdd)=>{
    try{
        const response=await createBrgDao(fields);
        if("error" in response)return handleError(response.error,response.message);
        return response;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios");
    }
}
