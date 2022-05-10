const { getBrgDao, createBrgDao } = require("../../dao/brg");
const { handleError } = require("../../helpers/handleError")

const getBrgService=async()=>{
    try{
        const result=await getBrgDao();
        if(result.error)return handleError(result.error,result.message);
        return result
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
const addBrgService=async(fields)=>{
    try{
        const response=await createBrgDao(fields);
        if(response.error)return handleError(response.error,response.message);
        return response;
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
module.exports={getBrgService,addBrgService}