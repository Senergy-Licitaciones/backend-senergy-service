import { handleError } from "../../helpers/handleError";
import PuntoSumModel from "../../apiServices/puntoSum/model";
import { FieldsAdd } from "../../types/form";
import { Dao, DaoWithoutParam } from "../../types/methods";
import { ErrorResponse, ResponseParent } from "../../types/data";
import { Document, Types } from "mongoose";
export const getPuntoSumDao:DaoWithoutParam<ErrorResponse|Array<Document<any, any, FieldsAdd> & FieldsAdd & {
    _id: Types.ObjectId}>>=async()=>{
    try{
        const result=await PuntoSumModel.find();
        return result;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const createPuntoSumDao:Dao<FieldsAdd,ErrorResponse|ResponseParent>=async(fields)=>{
    try{
        const response=await PuntoSumModel.create({name:fields.name});
        const puntoSum=await response.save();
        return{
            message:`Punto de suministro ${puntoSum.name} agregado exitosamente`
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
