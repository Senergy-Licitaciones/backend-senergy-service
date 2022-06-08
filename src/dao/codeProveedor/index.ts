import { handleError } from "../../helpers/handleError";
import ProveedorModel from "../../apiServices/proveedor/model";
import CodeProveedorModel from "../../apiServices/codeProveedor/model";
import { CodeProveedorFields } from "../../types/form";
import { CodeProveedor, ErrorResponse, Proveedor } from "../../types/data";
import { Dao } from "../../types/methods";
import { Document, Types } from "mongoose";
CodeProveedorModel.watch().on("change",(change)=>{
    if(change.operationType==="delete"){
        let docKey=change.documentKey as {_id:string}
        const removeProveedorAccount=async()=>{
            try{
                const response=await ProveedorModel.findOneAndDelete({codeToOCnfirm:docKey._id,verified:false}) as Proveedor;
                if(!response) console.log("no existe la cuenta ",response);
                console.log("response ",response);
            }catch(err){
                console.log("error ocurrido al eliminar cuenta de proveedor ",err);
            }
        }
        removeProveedorAccount();
    }
})
export const createCodeProveedorDao:Dao<CodeProveedorFields,ErrorResponse|Document<any, any, CodeProveedor> & CodeProveedor & {
    _id: Types.ObjectId}>=async(fields)=>{
    try{
        const response=await CodeProveedorModel.create(fields);
        const code=await response.save();
        return code;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error al crear el código");
    }
}
export const confirmCodeDao:Dao<{correo:string,code:string},ErrorResponse|Document<any, any, CodeProveedor> & CodeProveedor & {
    _id: Types.ObjectId
}>=async({correo,code})=>{
    try{
        const response=await CodeProveedorModel.findOne({proveedor:correo,code});
        if(!response) throw new Error("Código inválido");
        return response;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un erro al encontrar el código");
    }
}
