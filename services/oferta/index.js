const { getOfertasDao, getOfertaByIdDao, updateOfertaDao } = require("../../dao/oferta");
const { handleError } = require("../../helpers/handleError");

const getOfertasService=async(id)=>{
    try{
        const ofertas=await getOfertasDao(id);
        if(ofertas.error)return handleError(ofertas.error,ofertas.message);
        return ofertas
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios al obtener las ofertas")
    }
}
const getOfertaByIdService=async(ofertaId)=>{
    try{
        const oferta=await getOfertaByIdDao(ofertaId);
        if(oferta.error)return handleError(oferta.error,oferta.message);
        return oferta;
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios al obtener la oferta");
    }
}
const updateOfertaService=async(ofertaId,fields)=>{
    try{
        const oferta=await updateOfertaDao(ofertaId,fields);
        if(oferta.error)return handleError(oferta.error,oferta.message);
        return{
            message:`Oferta para ${oferta.licitacion.empresa} actualizada exitosamente `
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios a actualizar la oferta");
    }
}
module.exports={updateOfertaService,getOfertasService,getOfertaByIdService};