import { Document, ObjectId, Types } from "mongoose";
import { updateLicitacionDao } from "../../dao/licitacion";
import { getUsersDao } from "../../dao/usuario";
import { handleError } from "../../helpers/handleError";
import { ErrorResponse, ResponseParent, User } from "../../types/data";
import { Estado } from "../../types/form/enums";
import { Service, ServiceWithoutParam } from "../../types/methods";

export const changeStatusService:Service<{status:Estado,id:ObjectId},ErrorResponse|ResponseParent>=async({status,id})=>{
    try{
        const result=await updateLicitacionDao({fields:{status},id});
        if("error" in result)handleError(result.error,result.message);
        return {
            message:"Estado de la licitación actualizado"
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Error en la capa de servicios");
    }
}
export const getUsersService:ServiceWithoutParam<ErrorResponse|Array<Document<any, any, User> & User & {
    _id: Types.ObjectId}>>=async()=>{
    try{
        const users=await getUsersDao();
        if("error" in users)return handleError(users.error,users.message);
        return users
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios al obtener los usuarios");
    }
}
