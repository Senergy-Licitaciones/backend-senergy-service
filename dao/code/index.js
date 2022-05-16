const CodeModel=require("../../apiServices/code/model");
const { handleError } = require("../../helpers/handleError");
const createCodeDao=async(fields)=>{
    try{
        await CodeModel.create(fields);
        return{
            message:"Código creado exitosamente"
        }
    }catch(err){
        console.log("error code dao ",err);
        return handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
const verifyCodeDao=async(idUser)=>{
    try{
        const result=await CodeModel.findOne({user:idUser});
        if(!result)return handleError(true,"Código ya enviado");
        return{
            message:"Código por crear y enviar"
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
const removeCodeDao=async(idUser,code)=>{
    try{
        const response=await CodeModel.findOneAndDelete({user:idUser,code});
        console.log("response code ",response);
        if(!response) return handleError(true,"Código inválido");
        return{
            message:"Código validado exitosamente"
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
module.exports={createCodeDao,verifyCodeDao,removeCodeDao}