import { handleError } from "../../helpers/handleError";
import LicitacionModel from "../../apiServices/licitacion/model";
import { DocType, ErrorResponse, Licitacion, ResponseParent } from "../../types/data";
import { Document, ObjectId, Types, UpdateQuery } from "mongoose";
import { Dao, DaoWithoutParam } from "../../types/methods";
export const showLicitacionesDao:DaoWithoutParam<ErrorResponse|Array<Document<any, any, Licitacion> & Licitacion & {
    _id: Types.ObjectId}>>=async()=>{
    try{
        const licitaciones=await LicitacionModel.find().populate("tipoServicio");
        return licitaciones;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos")
    }
}
export const createLicitacionDao:Dao<Omit<Licitacion,"_id">,ErrorResponse|ResponseParent>=async(fields)=>{
    try{
        await LicitacionModel.create({...fields});
        return{
            message:"Licitacion creada exitosamente"
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const updateLicitacionDao:Dao<{fields:UpdateQuery<Partial<Omit<Licitacion,"_id">>>,id:ObjectId},ErrorResponse|ResponseParent>=async({fields,id})=>{
    try{
        const result=await LicitacionModel.findByIdAndUpdate(id,{...fields},{new:true});
        if(!result)throw new Error("No se encontró la licitación");
        return{
            message:"Licitación actualizada exitosamente"
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const getTiposDao:Dao<string,ErrorResponse|Array<Document<any, any, Licitacion> & Licitacion & {
    _id: Types.ObjectId}>>=async(id:string)=>{
    try{
        const result=await LicitacionModel.find({usuario:id}).select("-participantes -usuario -puntoSum -brg -meses -tipoServicio");
        return result
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const getLicitacionesFreeDao:Dao<ObjectId,ErrorResponse|Array<Document<any, any, Licitacion> & Licitacion & {
    _id: Types.ObjectId}>>=async(proveedorId)=>{
    try{
        const licitaciones=await LicitacionModel.find({
            $nor:[{"participantes":proveedorId}]
        }).populate("tipoServicio");
        return licitaciones;
    }catch(err){
        console.log("error ",err);
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos al obtener licitaciones libres");
    }
}
export const getLicitacionByIdDao:Dao<ObjectId,ErrorResponse|Document<any, any, Licitacion> & Licitacion & {
    _id: Types.ObjectId}>=async(id)=>{
    try{
        const licitacion=await LicitacionModel.findById(id).select("-usuario -participantes").populate("tipoServicio puntoSum brg");
        if(!licitacion)throw new Error("La licitación no existe");
        return licitacion
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos al mostrar la licitación ");
    }
}
export const getLicitacionesByUserDao:Dao<string,ErrorResponse|Array<DocType<Licitacion>>>=async(id)=>{
    try{
        const licitaciones=await LicitacionModel.find({usuario:id});
        return licitaciones;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos al obtener las licitaciones")
    }
}