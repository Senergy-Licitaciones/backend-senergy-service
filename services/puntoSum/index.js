const { getPuntoSumDao, createPuntoSumDao } = require("../../dao/puntoSum");
const { handleError } = require("../../helpers/handleError")

const getPuntoSumService=async()=>{
    try{
        const result=await getPuntoSumDao();
        if(result.error)return handleError(result.error,result.message);
        return result
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
const addPuntoSumService=async(fields)=>{
    try{
        const response=await createPuntoSumDao(fields);
        if(response.error)return handleError(response.error,response.message);
        return response;
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
module.exports={getPuntoSumService,addPuntoSumService}