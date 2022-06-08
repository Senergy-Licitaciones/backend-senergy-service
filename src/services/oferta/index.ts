import { Document, ObjectId, Types } from "mongoose";
import { getOfertasDao, getOfertaByIdDao, updateOfertaDao } from "../../dao/oferta";
import { handleError } from "../../helpers/handleError";
import { ErrorResponse, Oferta, ResponseParent } from "../../types/data";
import { Service } from "../../types/methods";

export const getOfertasService:Service<ObjectId,ErrorResponse|Array<Document<any, any, Oferta> & Oferta & {
    _id: Types.ObjectId}>>=async(id)=>{
    try{
        const ofertas=await getOfertasDao(id);
        if("error" in ofertas)return handleError(ofertas.error,ofertas.message);
        return ofertas
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios al obtener las ofertas")
    }
}
export const getOfertaByIdService:Service<ObjectId,ErrorResponse|Document<any, any, Oferta> & Oferta & {
    _id: Types.ObjectId}>=async(ofertaId)=>{
    try{
        const oferta=await getOfertaByIdDao(ofertaId);
        if("error" in oferta)return handleError(oferta.error,oferta.message);
        return oferta;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios al obtener la oferta");
    }
}
export const updateOfertaService:Service<{ofertaId:ObjectId,fields:Partial<Oferta>},ErrorResponse|ResponseParent>=async({ofertaId,fields})=>{
    try{
        const oferta=await updateOfertaDao({ofertaId,fields});
        if("error" in oferta)return handleError(oferta.error,oferta.message);
        return{
            message:`Oferta para ${oferta.licitacion.empresa} actualizada exitosamente `
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios a actualizar la oferta");
    }
}
