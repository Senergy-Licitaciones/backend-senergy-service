import { getServiciosDao, createServicioDao } from "../../dao/servicio";
import { handleError } from "../../helpers/handleError";
import { FieldsAdd } from "../../types/form";

export const getServiciosService=async()=>{
    try{
        const result=await getServiciosDao();
        if("error" in result)return handleError(result.error,result.message);
        return result
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios");
    }
}
export const addServicioService=async(fields:FieldsAdd)=>{
    try{
        const response=await createServicioDao(fields);
        if("error" in response)return handleError(response.error,response.message);
        return response
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios");
    }
}
