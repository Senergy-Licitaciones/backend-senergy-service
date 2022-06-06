import bcrypt from "bcryptjs";
import { handleError } from "./handleError";

export const encrypt=async(password:string)=>{
    try{
        const hash= await bcrypt.hash(password,10);
        return hash;
    }catch(err){
        let error=err as Error;
       return handleError(error,"Ha ocurrido un error al momento de encriptar la contraseña")
    }
}
export const compare=async(password:string,hash:string)=>{
    try{
        const res=await bcrypt.compare(password,hash);
        return res
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error al verificar la contraseña")
    }
}
