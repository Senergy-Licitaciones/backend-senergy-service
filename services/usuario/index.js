const { updateLicitacionDao } = require("../../dao/licitacion");
const { getUsersDao } = require("../../dao/usuario");
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
const getUsersService=async()=>{
    try{
        const users=await getUsersDao();
        if(users.error)return handleError(users.error,users.message);
        return users
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios al obtener los usuarios");
    }
}
module.exports={changeStatusService,getUsersService}