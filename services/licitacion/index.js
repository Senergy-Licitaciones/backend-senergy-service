const { showLicitacionesDao, createLicitacionDao,updateLicitacionDao } = require("../../dao/licitacion");
const { handleError } = require("../../helpers/handleError")

const mostrarLicitacionesService=async()=>{
    try{
        const result=await showLicitacionesDao();
        if(result.error)handleError(result.error,result.message);
        return result
    }catch(err){
        handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
const crearLicitacionService=async(fields)=>{
    try{
        const result=await createLicitacionDao(fields);
        if(result.error)handleError(result.error,result.message);
        return {
            message:"Licitación creada exitosamente"
        }
    }catch(err){
        handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
const updateLicitacionService=async(fields,id)=>{
    try{
        const result=await updateLicitacionDao(fields,id);
        if(result.error)handleError(result.error,result.message);
        return{
            message:result.message
        }
    }catch(err){
        handleError(err,"Ha ocurrido un error en la capa de servicios")
    }
}
module.exports={mostrarLicitacionesService,crearLicitacionService,updateLicitacionService}