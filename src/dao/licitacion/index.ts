import { handleError } from "../../helpers/handleError";
import LicitacionModel from "../../apiServices/licitacion/model";
import { Licitacion } from "../../types/data";
import { ObjectId, UpdateQuery } from "mongoose";
export const showLicitacionesDao=async()=>{
    try{
        const licitaciones=await LicitacionModel.find().populate("tipoServicio");
        return licitaciones;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos")
    }
}
export const createLicitacionDao=async(fields:Omit<Licitacion,"_id">)=>{
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
export const updateLicitacionDao=async(fields:UpdateQuery<Partial<Omit<Licitacion,"_id">>>,id:ObjectId)=>{
    try{
        const result=await LicitacionModel.findByIdAndUpdate(id,{...fields},{new:true});
        if(!result)throw new Error("No se encontró la licitación");
        return result;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const getTiposDao=async(id:string)=>{
    try{
        const result=await LicitacionModel.find({usuario:id}).select("-participantes -usuario -puntoSum -brg -meses -tipoServicio");
        return result
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const getLicitacionesFreeDao=async(proveedorId:ObjectId)=>{
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
export const getLicitacionByIdDao=async(id:ObjectId)=>{
    try{
        const licitacion=await LicitacionModel.findById(id).select("-usuario -participantes").populate("tipoServicio puntoSum brg");
        if(!licitacion)throw new Error("La licitación no existe");
        return licitacion
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos al mostrar la licitación ");
    }
}
