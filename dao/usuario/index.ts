import { handleError } from "../../helpers/handleError";
import UsuarioModel from "../../apiServices/usuario/model";
import { User } from "../../types/data";
import { UserRegisterFields } from "../../types/form";
export const crearUsuarioDao=async(fields:UserRegisterFields)=>{
    try{
        const user=await UsuarioModel.create({...fields});
        const response=await user.save();
        return response
    }catch(err){
        console.log("error crear user dao ",err);
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos")
    }
}
export const verifyCorreoDao=async(correo:string)=>{
    try{
        const result=await UsuarioModel.findOne({correo});
        if(result) return{message:"Correo ya usado",_id:result._id};
        return{
            message:"Correo disponible"
        }
    }catch(err){
        console.log("usuario dao ",err);
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const updateUsuarioDao=async(fields:Partial<User>,id:string)=>{
    try{
        const result=await UsuarioModel.findByIdAndUpdate(id,{...fields},{new:true});
        return{
            message:`Usuario ${result.correo} actualizado correctamente`
        }
    }catch(err){
        let error=err as Error;
       return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const confirmUserDao=async(idUser:string)=>{
    try{
        const response=await UsuarioModel.findByIdAndUpdate(idUser,{estado:"offline"});
        if(!response) throw new Error("Usuario no encontrado");
        return{
            message:"Cuenta confirmada exitosamente"
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const getUserHashDao=async(correo:string)=>{
    try{
        const response=await UsuarioModel.findOne({correo}).select("password role correo");
        if(!response)throw new Error("Correo no registrado");
        return response;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const getUserDao=async(correo:string)=>{
    try{
        const user=await UsuarioModel.findOne({correo,role:"admin"});
        if(!user)throw new Error("Usuario no encontrado");
        return user
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos al encontrar el usuario");
    }
}
export const getUsersDao=async()=>{
    try{
        const users=await UsuarioModel.find({
            $nor:[{role:"admin"}]
        });
        return users;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos al obtener la lista de usuarios")
    }
}
