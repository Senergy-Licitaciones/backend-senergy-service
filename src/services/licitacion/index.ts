import { Types } from "mongoose";
import { showLicitacionesDao, createLicitacionDao, updateLicitacionDao, getTiposDao, getLicitacionesFreeDao, getLicitacionByIdDao } from "../../dao/licitacion";
import { handleError } from "../../helpers/handleError";
import { DocType, ErrorResponse, Licitacion, ResponseParent } from "../../types/data";
import { LicitacionRegisterFields } from "../../types/form";
import { Service, ServiceWithoutParam } from "../../types/methods";

export const mostrarLicitacionesService:ServiceWithoutParam<ErrorResponse|Array<DocType<Licitacion>>>=async()=>{
    try{
        const result=await showLicitacionesDao();
        if("error" in result)return handleError(result.error,result.message);
        return result
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios");
    }
}
export const crearLicitacionService:Service<LicitacionRegisterFields,ErrorResponse|ResponseParent>=async(fields:LicitacionRegisterFields)=>{
    try{
        const {title,description,tipoServicio,numLicitacion,requisitos,estado,empresa,fechaInicioApertura,fechaFinApertura,fechaInicio,puntoSum,brg,factorPlanta,meses,fechaFin,usuario,author}=fields;
        const result=await createLicitacionDao({title,description,tipoServicio,numLicitacion,requisitos,estado,empresa,fechaInicioApertura,fechaFinApertura,fechaInicio,puntoSum,brg,factorPlanta,meses,fechaFin,usuario,author});
        if("error" in result)return handleError(result.error,result.message);
        return {
            message:"Licitación creada exitosamente"
        }
    }catch(err){
        console.log("error ",err);
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios");
    }
}
export const updateLicitacionService:Service<{fields:Partial<Licitacion>,id:Types.ObjectId},ErrorResponse|ResponseParent>=async({fields,id})=>{
    try{
        const result=await updateLicitacionDao({fields,id});
        if("error" in result)handleError(result.error,result.message);
        return{
            message:result.message
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios")
    }
}
export const getTiposService:Service<string,ErrorResponse|Array<DocType<Licitacion>>>=async(id)=>{
    try{
        const result=await getTiposDao(id);
        if("error" in result)return handleError(result.error,result.message);
        return result
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios");
    }
}
export const getLicitacionesFreeService:Service<Types.ObjectId,ErrorResponse|Array<DocType<Licitacion>>>=async(proveedorId)=>{
    try{
        const licitaciones=await getLicitacionesFreeDao(proveedorId);
        if("error" in licitaciones)return handleError(licitaciones.error,licitaciones.message);
        return licitaciones
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios al mostrar licitaciones libres");
    }
}
export const getLicitacionByIdService:Service<Types.ObjectId,ErrorResponse|DocType<Licitacion>>=async(id)=>{
    try{
        const licitacion=await getLicitacionByIdDao(id);
        if("error" in licitacion)return handleError(licitacion.error,licitacion.message);
        return licitacion;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios al intentar mostrar la licitación")
    }
}
