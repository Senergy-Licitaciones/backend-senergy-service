const { handleError } = require("../../helpers/handleError")
const PuntoSumModel=require("../../apiServices/puntoSum/model");
const getPuntoSumDao=async()=>{
    try{
        const result=await PuntoSumModel.find();
        return result;
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
const createPuntoSumDao=async(fields)=>{
    try{
        const response=await PuntoSumModel.create({name:fields.name});
        const puntoSum=await response.save();
        return{
            message:"Punto de Suministro agregadp exitosamente"
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
module.exports={getPuntoSumDao,createPuntoSumDao}