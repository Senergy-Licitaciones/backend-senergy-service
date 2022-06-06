const { showLicitacionesDao, createLicitacionDao,updateLicitacionDao, getTiposDao, getLicitacionesFreeDao, getLicitacionByIdDao } = require("../../dao/licitacion");
const { handleError } = require("../../helpers/handleError")

const mostrarLicitacionesService=async()=>{
    try{
        const result=await showLicitacionesDao();
        if(result.error)return handleError(result.error,result.message);
        return result
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
const crearLicitacionService=async(fields)=>{
    try{
        const {title,description,tipoServicio,numLicitacion,requisitos,estado,empresa,fechaInicioApertura,fechaFinApertura,fechaInicio,puntoSum,brg,factorPlanta,meses,fechaFin,usuario,participantes=[]}=fields;
        const result=await createLicitacionDao({title,description,tipoServicio,numLicitacion,requisitos,estado,empresa,fechaInicioApertura,fechaFinApertura,fechaInicio,puntoSum,brg,factorPlanta,meses,fechaFin,usuario,participantes});
        if(result.error)return handleError(result.error,result.message);
        return {
            message:"Licitación creada exitosamente"
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios");
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
const getTiposService=async(id)=>{
    try{
        const result=await getTiposDao(id);
        if(result.error)return handleError(result.error,result.message);
        return result
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
const getLicitacionesFreeService=async(proveedorId)=>{
    try{
        const licitaciones=await getLicitacionesFreeDao(proveedorId);
        if(licitaciones.error)return handleError(licitaciones.error,licitaciones.message);
        return licitaciones
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios al mostrar licitaciones libres");
    }
}
const getLicitacionByIdService=async(id)=>{
    try{
        const licitacion=await getLicitacionByIdDao(id);
        if(licitacion.error)return handleError(licitacion.error,licitacion.message);
        return licitacion;
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios al intentar mostrar la licitación")
    }
}
module.exports={getLicitacionByIdService,getLicitacionesFreeService,getTiposService,mostrarLicitacionesService,crearLicitacionService,updateLicitacionService}