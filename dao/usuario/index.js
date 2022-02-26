const { handleError } = require("../../helpers/handleError")
const UsuarioModel=require("../../apiServices/usuario/model");
const crearUsuarioDao=async(fields)=>{
    try{
        await UsuarioModel.create({...fields});
        return{
            message:"Usuario creado exitosamente"
        }
    }catch(err){
        handleError(err,"Ha ocurrido un error en la capa de datos")
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
module.exports={crearUsuarioDao,updateUsuarioDao}