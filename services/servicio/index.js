const { getServiciosDao, createServicioDao } = require("../../dao/servicio");
const { handleError } = require("../../helpers/handleError")

const getServiciosService=async()=>{
    try{
        const result=await getServiciosDao();
        if(result.error)return handleError(result.error,result.message);
        return result
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
const addServicioService=async(fields)=>{
    try{
        const response=await createServicioDao(fields);
        if(response.error)return handleError(response.error,response.message);
        return response
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
module.exports={getServiciosService,addServicioService}