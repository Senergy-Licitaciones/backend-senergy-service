import { handleError } from "../../helpers/handleError";
import ServicioModel from "../../apiServices/servicio/model";
import { FieldsAdd } from "../../types/form";
export const getServiciosDao=async()=>{
    try{
        const result=await ServicioModel.find();
        return result;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const createServicioDao=async(fields:FieldsAdd)=>{
    try{
        const response=await ServicioModel.create({name:fields.name});
        const servicio=await response.save();
        return{
            message:`Servicio ${servicio.name} agregado exitosamente `
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error al agregar el nuevo servicio");
    }
}
