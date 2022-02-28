const { crearProveedorDao } = require("../../dao/proveedor");
const { crearUsuarioDao } = require("../../dao/usuario");
const { tokenSignUser, tokenSignProveedor } = require("../../helpers/generateToken");
const { compare } = require("../../helpers/handleBcrypt");
const { handleError } = require("../../helpers/handleError")

const registrarUsuarioService=async(fields)=>{
    try{
        const {message,error}=await crearUsuarioDao(fields);
        if(error)handleError(error,message);
        return{
            message:"Usuario registrado exitosamente"
        }
    }catch(err){
        handleError(err,"Ha ocurrido un error en la capa de servicios")
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
module.exports={registrarUsuarioService,registrarProveedorService,loginProveedorService,loginUsuarioService}