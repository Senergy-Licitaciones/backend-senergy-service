import { handleError } from "../../helpers/handleError";
import BrgModel from "../../apiServices/brg/model";
import { FieldsAdd } from "../../types/form";
import { Dao, DaoWithoutParam } from "../../types/methods";
import { ErrorResponse, ResponseParent } from "../../types/data";
import { Document, Types } from "mongoose";

export const getBrgDao:DaoWithoutParam<ErrorResponse|Array<Document<any, any, FieldsAdd> & FieldsAdd & {
    _id: Types.ObjectId}>>=async()=>{
    try{
        const result=await BrgModel.find();
        return result;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const createBrgDao:Dao<FieldsAdd,ErrorResponse|ResponseParent>=async(fields)=>{
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
