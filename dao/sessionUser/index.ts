import SessionUserModel from "../../apiServices/sessionUser/model";
import UsuarioModel from "../../apiServices/usuario/model";
import { handleError } from "../../helpers/handleError";
import { Estado } from "../../types/data";
SessionUserModel.watch().on("change",(change)=>{
    if(change.operationType==="delete"){
        let docKey=change.documentKey as {_id:string};
        const closeSession=async()=>{
            await UsuarioModel.findOneAndUpdate({sessionId:docKey._id},{estado:Estado.Offline,sessionId:null});
        }
        closeSession();
    }
});
export const createSessionUser=async(idUser:string,token:string)=>{
    try{
        const response=await SessionUserModel.create({user:idUser,jwt:token});
        const session=await response.save();
        return{
            message:"Sesión creada exitosamente",
            id:session._id
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error al crear la sesión");
    }
}
export const logoutUserDao=async(id:string)=>{
    try{
        const response=await SessionUserModel.findOneAndDelete({user:id});
        return{
            message:"Sesión cerrada exitosamente"
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error al cerrar sesión con los datos");
    }
}