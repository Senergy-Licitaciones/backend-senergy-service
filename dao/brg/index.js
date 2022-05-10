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
const createBrgDao=async(fields)=>{
    try{
        const response=await BrgModel.create({name:fields.name});
        const brg=await response.save();
        return{
            message:"BRG añadido exitosamente"
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error al crear un nuevo BRG");
    }
}
module.exports={getBrgDao,createBrgDao}