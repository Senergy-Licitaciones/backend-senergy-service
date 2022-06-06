import { ObjectId } from "mongoose";
import { showLicitacionesDao, createLicitacionDao, updateLicitacionDao, getTiposDao, getLicitacionesFreeDao, getLicitacionByIdDao } from "../../dao/licitacion";
import { handleError } from "../../helpers/handleError";
import { Licitacion } from "../../types/data";
import { LicitacionRegisterFields } from "../../types/form";

export const mostrarLicitacionesService=async()=>{
    try{
        const result=await showLicitacionesDao();
        if("error" in result)return handleError(result.error,result.message);
        return result
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios");
    }
}
export const crearLicitacionService=async(fields:LicitacionRegisterFields)=>{
    try{
        const {title,description,tipoServicio,numLicitacion,requisitos,estado,empresa,fechaInicioApertura,fechaFinApertura,fechaInicio,puntoSum,brg,factorPlanta,meses,fechaFin,usuario}=fields;
        const result=await createLicitacionDao({title,description,tipoServicio,numLicitacion,requisitos,estado,empresa,fechaInicioApertura,fechaFinApertura,fechaInicio,puntoSum,brg,factorPlanta,meses,fechaFin,usuario,participantes:[]});
        if("error" in result)return handleError(result.error,result.message);
        return {
            message:"Licitación creada exitosamente"
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios");
    }
}
export const updateLicitacionService=async(fields:Partial<Licitacion>,id:ObjectId)=>{
    try{
        const result=await updateLicitacionDao(fields,id);
        if(result.error)handleError(result.error,result.message);
        return{
            message:result.message
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios")
    }
}
export const getTiposService=async(id:string)=>{
    try{
        const result=await getTiposDao(id);
        if("error" in result)return handleError(result.error,result.message);
        return result
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios");
    }
}
export const getLicitacionesFreeService=async(proveedorId:ObjectId)=>{
    try{
        const licitaciones=await getLicitacionesFreeDao(proveedorId);
        if("error" in licitaciones)return handleError(licitaciones.error,licitaciones.message);
        return licitaciones
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios al mostrar licitaciones libres");
    }
}
export const getLicitacionByIdService=async(id:ObjectId)=>{
    try{
        const licitacion=await getLicitacionByIdDao(id);
        if(licitacion.error)return handleError(licitacion.error,licitacion.message);
        return licitacion;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios al intentar mostrar la licitación")
    }
}
