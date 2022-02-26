const { crearProveedorDao } = require("../../dao/proveedor");
const { crearUsuarioDao } = require("../../dao/usuario");
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
        const {correo,password,id}=fields;
        const {message,error}=await updateProveedorDao({estado:"online"},id);
        if(error)handleError(error,message);
        return{
            message:"Proveedor logeado exitosamente"
        }
    }catch(err){
        handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
const loginUsuarioService=async(fields)=>{
    try{
        const {correo,password,id}=fields;
        const {message,error}=await updateUsuarioDao({estado:"online"},id);
        if(error)handleError(error,message);
        return{
            message:"Usuario logeado exitosamente"
        }
    }catch(err){
        handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
module.exports={registrarUsuarioService,registrarProveedorService,loginProveedorService,loginUsuarioService}