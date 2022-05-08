const { getBrgDao } = require("../../dao/brg");
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
module.exports={getBrgService}