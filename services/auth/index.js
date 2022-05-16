const { createCodeDao, verifyCodeDao, removeCodeDao } = require("../../dao/code");
const { crearProveedorDao } = require("../../dao/proveedor");
const { createSessionUser, logoutUserDao } = require("../../dao/sessionUser");
const { crearUsuarioDao, verifyCorreoDao, confirmUserDao, getUserHashDao, updateUsuarioDao } = require("../../dao/usuario");
const { tokenSignUser, tokenSignProveedor } = require("../../helpers/generateToken");
const { compare, encrypt } = require("../../helpers/handleBcrypt");
const { handleError } = require("../../helpers/handleError");
const generateCode = require("../../utils/generateCode");
const { sendCodeVerification } = require("../emails");

const registrarUsuarioService=async(fields)=>{
    try{
        const {correo,password,empresa,ruc,web="Sin Página Web",phone,address}=fields;
        const isFree=await verifyCorreoDao(correo);
        if(isFree.error)return handleError(isFree.error,isFree.message);
        if(!isFree._id){
            console.log("primer condicional ")
            const code=generateCode();
            const response=await sendCodeVerification(code,correo);
            if(response.error)return handleError(response.error,response.message);
            const hash=await encrypt(password);
            const user=await crearUsuarioDao({correo,password:hash,empresa,ruc,phone,address,web});
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
        const {correo,password}=fields;
        const user=await getUserHashDao(correo);
        const isCorrect=await compare(password,user.password);
        if(!isCorrect || isCorrect.error)return handleError(true,"La contraseña es incorrecta");
        const token=tokenSignUser({_id:user._id,correo});
        const result=await createSessionUser(user._id,token);
        if(result.error)return handleError(result.error,result.message);
        console.log("session user ",result);
        const response=await updateUsuarioDao({estado:"online",session:result.id},user._id);
        if(response.error)return handleError(response.error,response.message);
        console.log("update user ",response);
        return{
            message:"Usuario logeado exitosamente",
            token
        }
    }catch(err){
        console.log("error catch service ",err);
        return handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
const logoutUserService=async(id)=>{
    try{
        const response=await logoutUserDao(id);
        if(response.error)return handleError(response.error,response.message);
        return response;
    }catch(err){
        return handleError(err,"Ha ocurrido un error al cerrar sesión");
    }
}
module.exports={logoutUserService,registrarUsuarioService,registrarProveedorService,loginProveedorService,loginUsuarioService,confirmAccountService}