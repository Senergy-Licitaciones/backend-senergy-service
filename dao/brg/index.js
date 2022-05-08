const { handleError } = require("../../helpers/handleError")
const BrgModel=require("../../apiServices/brg/model");

const getBrgDao=async()=>{
    try{
        const result=await BrgModel.find();
        return result;
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
module.exports={getBrgDao}