import { ObjectId } from "mongoose";
import { getOfertasDao, getOfertaByIdDao, updateOfertaDao } from "../../dao/oferta";
import { handleError } from "../../helpers/handleError";
import { OfertaCreateFields } from "../../types/form";

export const getOfertasService=async(id:ObjectId)=>{
    try{
        const ofertas=await getOfertasDao(id);
        if("error" in ofertas)return handleError(ofertas.error,ofertas.message);
        return ofertas
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios al obtener las ofertas")
    }
}
export const getOfertaByIdService=async(ofertaId:ObjectId)=>{
    try{
        const oferta=await getOfertaByIdDao(ofertaId);
        if("error" in oferta)return handleError(oferta.error,oferta.message);
        return oferta;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios al obtener la oferta");
    }
}
export const updateOfertaService=async(ofertaId:ObjectId,fields:OfertaCreateFields)=>{
    try{
        const oferta=await updateOfertaDao(ofertaId,fields);
        if("error" in oferta)return handleError(oferta.error,oferta.message);
        return{
            message:`Oferta para ${oferta.licitacion.empresa} actualizada exitosamente `
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios a actualizar la oferta");
    }
}
