const { updateLicitacionDao } = require("../../dao/licitacion");
const {handleError } = require("../../helpers/handleError")

const changeStatusService=async(status,id)=>{
    try{
        const result=await updateLicitacionDao({status},id);
        if(result.error)handleError(result.error,result.message);
        return {
            message:"Estado de la licitación actualizado"
        }
    }catch(err){
        handleError(err,"Error en la capa de servicios");
    }
}
module.exports={changeStatusService}