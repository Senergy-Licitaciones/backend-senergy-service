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
module.exports={getServiciosDao}