import { handleError } from "../../helpers/handleError";
import ProveedorModel from "../../apiServices/proveedor/model";
import { DaoProveedorRegister } from "../../types/form";
import { ErrorResponse, Proveedor, ResponseParent } from "../../types/data";
import { Document, Types, UpdateQuery } from "mongoose";
import { Dao, DaoWithoutParam } from "../../types/methods";
import { Estado } from "../../types/data/enums";
export const crearProveedorDao:Dao<DaoProveedorRegister,ErrorResponse|Document<any, any, Proveedor> & Proveedor & {
    _id: Types.ObjectId}>=async(fields)=>{
    try{
        const response=await ProveedorModel.create({...fields});
        const proveedor=await response.save();
        return proveedor
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const updateProveedorDao:Dao<{fields:UpdateQuery<Partial<Proveedor>>,id:Types.ObjectId},ErrorResponse|Document<any, any, Proveedor> & Proveedor & {
    _id: Types.ObjectId}>=async({fields,id})=>{
    try{
        const result=await ProveedorModel.findByIdAndUpdate(id,{...fields},{new:true});
        if(!result) throw new Error("Cuenta inexistente");
        return result
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const verifyCorreoProveedorDao:Dao<string,ErrorResponse|ResponseParent>=async(correo)=>{
    try{
        const response=await ProveedorModel.findOne({correo});
        if(response)throw new Error("Correo ya usado");
        return{
            message:"Correo disponible"
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error al verificar el correo")
    }
}
export const confirmProveedorDao:Dao<string,ErrorResponse|Document<any, any, Proveedor> & Proveedor & {
    _id: Types.ObjectId}>=async(idCode:string)=>{
    try{
        const response=await ProveedorModel.findOneAndUpdate({
            codeToConfirm:idCode,
        verified:false},{codeToConfirm:null,
            verified:true
        },{new:true});
        if(!response)throw new Error("No se pudo encontrar la cuenta a confirmar")
        return response;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la actualizacion del proveedor");
    }
}
export const proveedorEstadoDao:Dao<string,ErrorResponse|Document<any, any, Proveedor> & Proveedor & {
    _id: Types.ObjectId;}>=async(correo)=>{
    try{
        const proveedor=await ProveedorModel.findOne({correo,verified:true, estado:Estado.Offline});
        if(!proveedor) throw new Error("Los datos son inválidos");
        return proveedor
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error al verificar la cuenta")
    }
}
export const getProveedoresDao:DaoWithoutParam<ErrorResponse|Array<Document<any, any, Proveedor> & Proveedor & {
    _id: Types.ObjectId}>>=async()=>{
    try{
        const proveedores=await ProveedorModel.find();
        return proveedores;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos al listar los proveedores");
    }
}
