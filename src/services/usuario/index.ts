import { ObjectId } from "mongoose";
import { updateLicitacionDao } from "../../dao/licitacion";
import { getUsersDao } from "../../dao/usuario";
import { handleError } from "../../helpers/handleError";
import { Estado } from "../../types/data";

export const changeStatusService=async(status:Estado,id:ObjectId)=>{
    try{
        const result=await updateLicitacionDao({status},id);
        if(result.error)handleError(result.error,result.message);
        return {
            message:"Estado de la licitación actualizado"
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Error en la capa de servicios");
    }
}
export const getUsersService=async()=>{
    try{
        const users=await getUsersDao();
        if("error" in users)return handleError(users.error,users.message);
        return users
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios al obtener los usuarios");
    }
}
