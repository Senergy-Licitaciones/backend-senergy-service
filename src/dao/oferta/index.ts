import { Document, ObjectId, Types } from "mongoose";
import OfertaModel from "../../apiServices/oferta/model";
import { handleError } from "../../helpers/handleError";
import { ErrorResponse, Licitacion, Oferta } from "../../types/data";
import { Dao } from "../../types/methods";
export const crearOfertaDao:Dao<Oferta,ErrorResponse|Document<any, any, Oferta> & Oferta & {
    _id: Types.ObjectId}>=async(fields)=>{
    try{
        console.log("fields ",fields);
        const oferta=await OfertaModel.create(fields);
        const result=await oferta.save();
        console.log("oferta: ",oferta);
        console.log("result ",result);
        return result;
    }catch(err){
        console.log("error ",err);
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos al crear la oferta");
    }
}
export const getOfertasDao:Dao<ObjectId,ErrorResponse|Array<Document<any, any, Oferta> & Oferta & {
    _id: Types.ObjectId}>>=async(id)=>{
    try{
        const ofertas=await OfertaModel.find({
            proveedor:id
        }).populate("licitacion");
        return ofertas;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos al obtener las ofertas")
    }
}
export const getOfertaByIdDao:Dao<ObjectId,ErrorResponse|Document<any, any, Oferta> & Oferta & {
    _id: Types.ObjectId}>=async(ofertaId)=>{
    try{
        const oferta=await OfertaModel.findById(ofertaId);
        if(!oferta)throw new Error("No eexiste la oferta seleccionada");
        return oferta
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos al obtener la oferta");
    }
}
export const updateOfertaDao:Dao<{ofertaId:ObjectId,fields:Partial<Omit<Oferta,"licitacion">>},ErrorResponse|Document<any, any, Oferta> & Oferta & {
    _id: Types.ObjectId} & {
    licitacion: Licitacion}>=async({ofertaId,fields})=>{
    try{
        const date=Date.now();
        let oferta=await OfertaModel.findById(ofertaId).populate<{licitacion:Licitacion}>("licitacion");
        if(!oferta) throw new Error("La oferta seleccionada no existe");
        if(new Date(oferta.licitacion.fechaFinApertura).getMilliseconds()>date)throw new Error("El plazo de tiempo para modificar esta oferta ya culminó");
        const result=await oferta.update(fields);
        console.log("Result update ",result);
        return oferta;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos al actualizar la oferta");
    }
}
