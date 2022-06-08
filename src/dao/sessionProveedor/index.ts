import { handleError } from "../../helpers/handleError";
import SessionProveedorModel from "../../apiServices/sessionProveedor/model";
import ProveedorModel from "../../apiServices/proveedor/model";
import { Estado } from "../../types/data/enums";
import { Document, Types } from "mongoose";
import { Dao } from "../../types/methods";
import { ErrorResponse, SessionProveedor } from "../../types/data";
SessionProveedorModel.watch().on("change",(change)=>{
    if(change.operationType==="delete"){
        let docKey=change.documentKey as {_id:string}
        const closeSession=async()=>{
            await ProveedorModel.findOneAndUpdate({session:docKey._id},{estado:Estado.Offline,session:""});
        }
        closeSession();
    }
});

export const createSessionProveedor:Dao<{proveedorId:Types.ObjectId,token:string},ErrorResponse|Document<any, any, SessionProveedor> & SessionProveedor & {
    _id: Types.ObjectId
}>=async({proveedorId,token})=>{
    try{
        const response=await SessionProveedorModel.create({proveedor:proveedorId,jwt:token});
        const session=await response.save();
        return session;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error al crear la sesión ")
    }
}
export const logoutProveedorDao:Dao<Types.ObjectId,ErrorResponse|Document<any, any, SessionProveedor> & SessionProveedor & {
    _id: Types.ObjectId}>=async(proveedorId)=>{
    try{
        const proveedor=await SessionProveedorModel.findOneAndDelete({proveedor:proveedorId});
        if(!proveedor)throw new Error("La sesión no existe");
        return proveedor;
    }catch(err){
        let error=err as Error;
        console.log("error ",err);
        return handleError(error,"Ha ocurrido un error al eliminar la sesión");
    }
}