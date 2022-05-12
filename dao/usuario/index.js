const { handleError } = require("../../helpers/handleError")
const UsuarioModel=require("../../apiServices/usuario/model");
const crearUsuarioDao=async(fields)=>{
    try{
        const user=await UsuarioModel.create({...fields});
        const response=await user.save();
        return response
    }catch(err){
        console.log("error crear user dao ",err);
        return handleError(err,"Ha ocurrido un error en la capa de datos")
    }
}
const verifyCorreoDao=async(correo)=>{
    try{
        const result=await UsuarioModel.findOne({correo});
        if(result) return{message:"Correo ya usado",_id:result._id};
        return{
            message:"Correo disponible"
        }
    }catch(err){
        console.log("usuario dao ",err);
        return handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
const updateUsuarioDao=async(fields,id)=>{
    try{
        const result=await UsuarioModel.findByIdAndUpdate(id,{...fields},{new:true});
        return{
            message:`Usuario ${result.correo} actualizado correctamente`
        }
    }catch(err){
        handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
const confirmUserDao=async(idUser)=>{
    try{
        const response=await UsuarioModel.findByIdAndUpdate(idUser,{estado:"offline"});
        if(!response) return handleError(true,"Usuario no encontrado");
        return{
            message:"Cuenta confirmada exitosamente"
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
const getUserHashDao=async(correo)=>{
    try{
        const response=await UsuarioModel.findOne({correo}).select("password ");
        if(!response)return handleError(true,"Correo no registrado");
        return response;
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
module.exports={crearUsuarioDao,updateUsuarioDao,verifyCorreoDao,confirmUserDao,getUserHashDao}