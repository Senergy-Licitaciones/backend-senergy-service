const { createCodeDao, verifyCodeDao, removeCodeDao } = require("../../dao/code");
const { createCodeProveedorDao, confirmCodeDao } = require("../../dao/codeProveedor");
const { crearProveedorDao, verifyCorreoProveedorDao, confirmProveedorDao, proveedorEstadoDao, updateProveedorDao } = require("../../dao/proveedor");
const { createSessionUser, logoutUserDao } = require("../../dao/sessionUser");
const {createSessionProveedor, logoutProveedorDao}=require("../../dao/sessionProveedor");
const { crearUsuarioDao, verifyCorreoDao, confirmUserDao, getUserHashDao, updateUsuarioDao, getUserDao } = require("../../dao/usuario");
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
        const exist=await verifyCorreoProveedorDao(fields.correo);
        if(exist.error) return handleError(exist.error,exist.message);
        const code=generateCode();
        const hash=await encrypt(fields.password);
        const response=await createCodeProveedorDao({code,proveedor:fields.correo});
        if(response.error)return handleError(response.error,response.message);
        const proveedor=await crearProveedorDao({...fields,password:hash,codeToConfirm:response._id});
        if(proveedor.error)return handleError(proveedor.error,proveedor.message);
        const result=await sendCodeVerification(code,fields.correo);
        if(result.error)return handleError(result.error,result.message);
        return{
            message:"Proveedor registrado esperando por confirmar",
            correo:proveedor.correo
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
const loginProveedorService=async(fields)=>{
    try{
        const proveedor=await proveedorEstadoDao(fields.correo);
        console.log("proveedor ",proveedor);
        if(proveedor.error)return handleError(proveedor.error,proveedor.message);
        const isCorrect=await compare(fields.password,proveedor.password);
        if(!isCorrect || isCorrect.error)return handleError(true,"La contraseña es incorrecta");
        const token=tokenSignProveedor(proveedor);
        const session=await createSessionProveedor(proveedor._id,token);
        console.log("session ",session);
        if(session.error)return handleError(session.error,session.message);
        const response=await updateProveedorDao({estado:"online",session:session._id},proveedor._id);
        console.log("response ",response);
        if(response.error)return handleError(response.error,response.message);
        return{
            message:"Proveedor logeado exitosamente",
            token
        }
    }catch(err){
        console.log("error ",err);
        return handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
const loginUsuarioService=async(fields)=>{
    try{
        const {correo,password}=fields;
        const user=await getUserHashDao(correo);
        const isCorrect=await compare(password,user.password);
        if(!isCorrect || isCorrect.error)return handleError(true,"La contraseña es incorrecta");
        const token=tokenSignUser(user);
        const result=await createSessionUser(user._id,token);
        if(result.error)return handleError(result.error,result.message);
        console.log("session user ",result);
        const response=await updateUsuarioDao({estado:"online",sessionId:result.id},user._id);
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
const confirmProveedorService=async(fields)=>{
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
        return handleError(err,"Ha ocurrido un error al intentar confirmar la cuenta");
    }
}
const logoutProveedorService=async(proveedorId)=>{
    try{
        const response=await logoutProveedorDao(proveedorId);
        if(response.error)return handleError(response.error,response.message);
        return{
            message:"Sesión cerrada exitosamente"
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error al cerrar la sesión");
    }
}
const loginAdminService=async(fields)=>{
    try{
        const {correo,password}=fields;
        const user=await getUserDao(correo);
        if(user.error)return handleError(user.error,user.message);
        const isCorrect=await compare(password,user.password);
        if(!isCorrect || isCorrect.error)return handleError(true,"Contraseña incorrecta");
        const token=tokenSignUser(user);
        const result=await createSessionUser(user._id,token);
        if(result.error)return handleError(result.error,result.message);
        const response=await updateUsuarioDao({estado:"online",sessionId:result.id},user._id);
        if(response.error)return handleError(response.error,response.message);
        return{
            message:"Usuario admin logeado exitosamente",
            token
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error al iniciar sesión")
    }
}
module.exports={loginAdminService,logoutProveedorService,confirmProveedorService,logoutUserService,registrarUsuarioService,registrarProveedorService,loginProveedorService,loginUsuarioService,confirmAccountService}