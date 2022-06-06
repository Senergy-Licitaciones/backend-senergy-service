import { ConfirmAccount, ConfirmProveedor, LoginFields, ProveedorRegisterFields, UserRegisterFields} from "../../types/form";

import { createCodeDao, verifyCodeDao, removeCodeDao } from "../../dao/code";
import { createCodeProveedorDao, confirmCodeDao } from "../../dao/codeProveedor";
import { crearProveedorDao, verifyCorreoProveedorDao, confirmProveedorDao, proveedorEstadoDao, updateProveedorDao } from "../../dao/proveedor";
import { Estado } from "../../types/data";
import { createSessionUser, logoutUserDao } from "../../dao/sessionUser";
import { createSessionProveedor, logoutProveedorDao } from "../../dao/sessionProveedor";
import { crearUsuarioDao, verifyCorreoDao, confirmUserDao, getUserHashDao, updateUsuarioDao, getUserDao } from "../../dao/usuario";
import { tokenSignUser, tokenSignProveedor } from "../../helpers/generateToken";
import { compare, encrypt } from "../../helpers/handleBcrypt";
import { handleError } from "../../helpers/handleError";
import generateCode from "../../utils/generateCode";
import { sendCodeVerification } from "../emails";
import { ObjectId } from "mongoose";

export const registrarUsuarioService=async(fields:UserRegisterFields)=>{
    try{
        const {correo,password,empresa,ruc,web="Sin Página Web",phone,address}=fields;
        const isFree=await verifyCorreoDao(correo);
        if("error" in isFree)return handleError(isFree.error,isFree.message);
        if(!isFree._id){
            console.log("primer condicional ")
            const code=generateCode();
            const response=await sendCodeVerification(code,correo);
            if("error" in response)return handleError(response.error,response.message);
            const hash=await encrypt(password);
            if(typeof hash!=="string") throw new Error(hash.message);
            const user=await crearUsuarioDao({correo,password:hash,empresa,ruc,phone,address,web});
            if(user.error)return handleError(user.error,user.message);
            const resultCode=await createCodeDao({code,user:user._id});
            if("error" in resultCode)return handleError(resultCode.error,resultCode.message);
            return{
                idUser:user._id,
                message:"Cuenta por confirmar"
            }
        }else{
          const result=await verifyCodeDao(isFree._id);
          if("error" in result)return handleError(result.error,result.message);
          const code=generateCode();
          const response=await sendCodeVerification(code,correo);
          if("error" in response)return handleError(response.error,response.message);
          const resultCode=await createCodeDao({code,user:isFree._id});
          if("error" in resultCode)return handleError(resultCode.error,resultCode.message);
          return{
              idUser:isFree._id,
              message:"Cuenta por confirmar"
          }
        }
        
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios")
    }
}
export const confirmAccountService=async(fields:ConfirmAccount)=>{
    try{
        const {idUser,code}=fields;
        const result=await removeCodeDao(idUser,code);
        if("error" in result)return handleError(result.error,result.message);
        const response=await confirmUserDao(idUser);
        if("error" in response) return handleError(response.error,response.message);
        return{
            message:"Cuenta confirmada exitosamente"
        }
    }catch(err){
         let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios")
    }
}
export const registrarProveedorService=async(fields:ProveedorRegisterFields)=>{
    try{
        const exist=await verifyCorreoProveedorDao(fields.correo);
        if("error" in exist) return handleError(exist.error,exist.message);
        const code=generateCode();
        const hash=await encrypt(fields.password);
        if(typeof hash !=="string")throw new Error(hash.message);
        const response=await createCodeProveedorDao({code,proveedor:fields.correo});
        if(response.error)return handleError(response.error,response.message);
        const proveedor=await crearProveedorDao({...fields,password:hash,codeToConfirm:response._id});
        if(proveedor.error)return handleError(proveedor.error,proveedor.message);
        const result=await sendCodeVerification(code,fields.correo);
        if("error" in result)return handleError(result.error,result.message);
        return{
            message:"Proveedor registrado esperando por confirmar",
            correo:proveedor.correo
        }
    }catch(err){
         let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios");
    }
}
export const loginProveedorService=async(fields:LoginFields)=>{
    try{
        const proveedor=await proveedorEstadoDao(fields.correo);
        console.log("proveedor ",proveedor);
        if(proveedor.error)return handleError(proveedor.error,proveedor.message);
        const isCorrect=await compare(fields.password,proveedor.password);
        if(!isCorrect || typeof isCorrect!=="boolean")throw new Error("La contraseña es incorrecta");
        const token=tokenSignProveedor(proveedor);
        const session=await createSessionProveedor(proveedor._id,token);
        console.log("session ",session);
        if(session.error)return handleError(session.error,session.message);
        const response=await updateProveedorDao({estado:Estado.Online,session:session._id},proveedor._id);
        console.log("response ",response);
        if(response.error)return handleError(response.error,response.message);
        return{
            message:"Proveedor logeado exitosamente",
            token
        }
    }catch(err){
        console.log("error ",err);
         let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios");
    }
}
export const loginUsuarioService=async(fields:LoginFields)=>{
    try{
        const {correo,password}=fields;
        const user=await getUserHashDao(correo);
        const isCorrect=await compare(password,user.password);
        if(!isCorrect || typeof isCorrect!=="boolean")throw new Error("La contraseña es incorrecta");
        const token=tokenSignUser(user);
        const result=await createSessionUser(user._id,token);
        if("error" in result)return handleError(result.error,result.message);
        console.log("session user ",result);
        const response=await updateUsuarioDao({estado:Estado.Online,sessionId:result.id},user._id);
        if("error" in response)return handleError(response.error,response.message);
        console.log("update user ",response);
        return{
            message:"Usuario logeado exitosamente",
            token
        }
    }catch(err){
        console.log("error catch service ",err);
     let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios");
    }
}
export const logoutUserService=async(id:string)=>{
    try{
        const response=await logoutUserDao(id);
        if("error" in response)return handleError(response.error,response.message);
        return response;
    }catch(err){
         let error=err as Error;
        return handleError(error,"Ha ocurrido un error al cerrar sesión");
    }
}
export const confirmProveedorService=async(fields:ConfirmProveedor)=>{
    try{
        const {correo,code}=fields;
        const response=await confirmCodeDao(correo,code);
        if(response.error) return handleError(response.error,response.message);
        const result=await confirmProveedorDao(response._id);
        if(result.error) return handleError(result.error,result.message);
        console.log("response ",response," result ",result);
        await response.remove();
        return{
            message:"Cuenta de proveeedor confirmado"
        }
    }catch(err){
         let error=err as Error;
        return handleError(error,"Ha ocurrido un error al intentar confirmar la cuenta");
    }
}
export const logoutProveedorService=async(proveedorId:ObjectId)=>{
    try{
        const response=await logoutProveedorDao(proveedorId);
        if(response.error)return handleError(response.error,response.message);
        return{
            message:"Sesión cerrada exitosamente"
        }
    }catch(err){
         let error=err as Error;
        return handleError(error,"Ha ocurrido un error al cerrar la sesión");
    }
}
export const loginAdminService=async(fields:LoginFields)=>{
    try{
        const {correo,password}=fields;
        const user=await getUserDao(correo);
        if(user.error)return handleError(user.error,user.message);
        const isCorrect=await compare(password,user.password);
        if(!isCorrect || typeof isCorrect!=="boolean")throw new Error("Contraseña incorrecta");
        const token=tokenSignUser(user);
        const result=await createSessionUser(user._id,token);
        if("error" in result)return handleError(result.error,result.message);
        const response=await updateUsuarioDao({estado:Estado.Online,sessionId:result.id},user._id);
        if("error" in response)return handleError(response.error,response.message);
        return{
            message:"Usuario admin logeado exitosamente",
            token
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error al iniciar sesión")
    }
}
