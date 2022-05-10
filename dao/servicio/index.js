const { handleError } = require("../../helpers/handleError")
const ServicioModel=require("../../apiServices/servicio/model");
const getServiciosDao=async()=>{
    try{
        const result=await ServicioModel.find();
        return result;
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
const createServicioDao=async(fields)=>{
    try{
        const response=await ServicioModel.create({name:fields.name});
        const servicio=await response.save();
        return{
            message:"Servicio agregado exitosamente"
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error al agregar el nuevo servicio");
    }
}
module.exports={getServiciosDao,createServicioDao}