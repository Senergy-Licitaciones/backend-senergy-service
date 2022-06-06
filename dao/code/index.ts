import CodeModel from "../../apiServices/code/model";
import { handleError } from "../../helpers/handleError";
import { CodeUserFields } from "../../types/form";
export const createCodeDao=async(fields:CodeUserFields)=>{
    try{
        await CodeModel.create(fields);
        return{
            message:"Código creado exitosamente"
        }
    }catch(err){
        console.log("error code dao ",err);
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const verifyCodeDao=async(idUser:string)=>{
    try{
        const result=await CodeModel.findOne({user:idUser});
        if(!result)throw new Error("Código ya enviado");
        return{
            message:"Código por crear y enviar"
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const removeCodeDao=async(idUser:string,code:string)=>{
    try{
        const response=await CodeModel.findOneAndDelete({user:idUser,code});
        console.log("response code ",response);
        if(!response) throw new Error("Código inválido");
        return{
            message:"Código validado exitosamente"
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
