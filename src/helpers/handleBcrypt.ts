import bcrypt from "bcryptjs";
import { ErrorResponse } from "../types/data";
import { Service } from "../types/methods";
import { handleError } from "./handleError";

export const encrypt:Service<string,string|ErrorResponse>=async(password)=>{
    try{
        const hash= await bcrypt.hash(password,10);
        return hash;
    }catch(err){
        let error=err as Error;
       return handleError(error,"Ha ocurrido un error al momento de encriptar la contraseña")
    }
}
export const compare:Service<{password:string,hash:string},ErrorResponse|boolean>=async(fields)=>{
    try{
        const{password,hash}=fields;
        const res=await bcrypt.compare(password,hash);
        return res
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error al verificar la contraseña")
    }
}
