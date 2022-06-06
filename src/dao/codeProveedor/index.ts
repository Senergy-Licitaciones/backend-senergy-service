import { handleError } from "../../helpers/handleError";
import ProveedorModel from "../../apiServices/proveedor/model";
import CodeProveedorModel from "../../apiServices/codeProveedor/model";
import { CodeProveedorFields } from "../../types/form";
import { Proveedor } from "../../types/data";
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
export const createCodeProveedorDao=async(fields:CodeProveedorFields)=>{
    try{
        const response=await CodeProveedorModel.create(fields);
        const code=await response.save();
        return code;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error al crear el código");
    }
}
export const confirmCodeDao=async(correo:string,code:string)=>{
    try{
        const response=await CodeProveedorModel.findOne({proveedor:correo,code});
        if(!response) throw new Error("Código inválido");
        return response;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un erro al encontrar el código");
    }
}
