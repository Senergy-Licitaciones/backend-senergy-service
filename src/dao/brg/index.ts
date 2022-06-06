import { handleError } from "../../helpers/handleError";
import BrgModel from "../../apiServices/brg/model";
import { FieldsAdd } from "../../types/form";

export const getBrgDao=async()=>{
    try{
        const result=await BrgModel.find();
        return result;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const createBrgDao=async(fields:FieldsAdd)=>{
    try{
        const response=await BrgModel.create<FieldsAdd>({name:fields.name});
        const brg=await response.save();
        return{
            message:`BRG ${brg.name} añadido exitosamente `
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error al crear un nuevo BRG");
    }
}
