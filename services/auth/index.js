const { createCodeDao, verifyCodeDao, removeCodeDao } = require("../../dao/code");
const { crearProveedorDao } = require("../../dao/proveedor");
const { crearUsuarioDao, verifyCorreoDao, confirmUserDao } = require("../../dao/usuario");
const { tokenSignUser, tokenSignProveedor } = require("../../helpers/generateToken");
const { compare } = require("../../helpers/handleBcrypt");
const { handleError } = require("../../helpers/handleError");
const generateCode = require("../../utils/generateCode");
const { sendCodeVerification } = require("../emails");

const registrarUsuarioService=async(fields)=>{
    try{
        const {correo,password,empresa}=fields;
        const isFree=await verifyCorreoDao(correo);
        if(isFree.error)return handleError(isFree.error,isFree.message);
        if(!isFree._id){
            const code=generateCode();
            const response=await sendCodeVerification(code,correo);
            if(response.error)return handleError(response.error,response.message);
            const user=await crearUsuarioDao({correo,password,empresa});
            if(user.error)return handleError(user.error,user.message);
            const resultCode=await createCodeDao({code,user:user._id});
            if(resultCode.error)return handleError(resultCode.error,resultCode.message);
            return{
                idUser:user._id,
                message:"Cuenta por confirmar"
            }
        }else{
          const result=await verifyCodeDao(isFree._id);
          if(result.error)return handleError(result.error,result.message);
          const code=generateCode();
          const response=await sendCodeVerification(code,correo);
          if(response.error)return handleError(response.error,response.message);
          const resultCode=await createCodeDao({code,user:isFree._id});
          if(resultCode.error)return handleError(resultCode.error,resultCode.message);
          return{
              idUser:isFree._id,
              message:"Cuenta por confirmar"
          }
        }
        
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios")
    }
}
const confirmAccountService=async(fields)=>{
    try{
        const {idUser,code}=fields;
        const result=await removeCodeDao(idUser,code);
        if(result.error)return handleError(result.error,result.message);
        const response=await confirmUserDao(idUser);
        if(response.error) return handleError(response.error,response.message);
        return{
            message:"Cuenta confirmada exitosamente"
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios")
    }
}
const registrarProveedorService=async(fields)=>{
    try{
        const {message,error}=await crearProveedorDao(fields);
        if(error)handleError(error,message);
        return{
            message:"Proveedor registrado exitosamente"
        }
    }catch(err){
        handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
const loginProveedorService=async(fields)=>{
    try{
        const {correo,password,id,hash,razSocial,licitaciones}=fields;
        const isCorrect=await compare(password,hash);
        if(!isCorrect || isCorrect.error)handleError(true,"La contraseña es incorrecta");
        const token=tokenSignProveedor({_id:id,razSocial,correo,licitaciones});
        const {message,error}=await updateProveedorDao({estado:"online",token},id);
        if(error)handleError(error,message);
        return{
            message:"Proveedor logeado exitosamente",
            token
        }
    }catch(err){
        handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
const loginUsuarioService=async(fields)=>{
    try{
        const {correo,password,id,hash,razSocial,nombre}=fields;
        const isCorrect=await compare(password,hash);
        if(!isCorrect || isCorrect.error)handleError(true,"La contraseña es incorrecta");
        const token=tokenSignUser({_id:id,razSocial,nombre,correo});
        const {message,error}=await updateUsuarioDao({estado:"online",jwt:token},id);
        if(error)handleError(error,message);
        return{
            message:"Usuario logeado exitosamente",
            token
        }
    }catch(err){
        handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
module.exports={registrarUsuarioService,registrarProveedorService,loginProveedorService,loginUsuarioService,confirmAccountService}