const { updateLicitacionDao } = require("../../dao/licitacion");
const { handleError } = require("../../helpers/handleError")

const participarLicitacionService=async(fields,id)=>{
    try{
        const result=await updateLicitacionDao(fields,id);
        if(result.error)handleError(result.error,result.message);
        return{
            message:"Se ha inscrito en la licitación exitosamente"
        }
    }catch(err){
        handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
module.exports={participarLicitacionService}