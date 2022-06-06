import { handleError } from "../../helpers/handleError";
import PuntoSumModel from "../../apiServices/puntoSum/model";
import { FieldsAdd } from "../../types/form";
export const getPuntoSumDao=async()=>{
    try{
        const result=await PuntoSumModel.find();
        return result;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const createPuntoSumDao=async(fields:FieldsAdd)=>{
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
