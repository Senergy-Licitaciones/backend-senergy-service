import { handleError } from "../../helpers/handleError";
import ServicioModel from "../../apiServices/servicio/model";
import { FieldsAdd } from "../../types/form";
import { Dao, DaoWithoutParam } from "../../types/methods";
import { ErrorResponse, ResponseParent } from "../../types/data";
import { Document, Types } from "mongoose";
export const getServiciosDao:DaoWithoutParam<ErrorResponse|Array<Document<any, any, FieldsAdd> & FieldsAdd & {
    _id: Types.ObjectId}>>=async()=>{
    try{
        const result=await ServicioModel.find();
        return result;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const createServicioDao:Dao<FieldsAdd,ErrorResponse|ResponseParent>=async(fields)=>{
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
