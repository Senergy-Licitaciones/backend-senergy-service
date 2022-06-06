import { handleError } from "../../helpers/handleError";
import ProveedorModel from "../../apiServices/proveedor/model";
import { DaoProveedorRegister } from "../../types/form";
import { Proveedor } from "../../types/data";
import { ObjectId, UpdateQuery } from "mongoose";
export const crearProveedorDao=async(fields:DaoProveedorRegister)=>{
    try{
        const response=await ProveedorModel.create({...fields});
        const proveedor=await response.save();
        return proveedor
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const updateProveedorDao=async(fields:UpdateQuery<Partial<Proveedor>>,id:ObjectId)=>{
    try{
        const result=await ProveedorModel.findByIdAndUpdate(id,{...fields},{new:true});
        if(!result) throw new Error("Cuenta inexistente");
        return result
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos");
    }
}
export const verifyCorreoProveedorDao=async(correo:string)=>{
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
export const confirmProveedorDao=async(idCode:string)=>{
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
export const proveedorEstadoDao=async(correo:string)=>{
    try{
        const proveedor=await ProveedorModel.findOne({correo,verified:true, estado:"offline"});
        if(!proveedor) throw new Error("Los datos son inválidos");
        return proveedor
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error al verificar la cuenta")
    }
}
export const getProveedoresDao=async()=>{
    try{
        const proveedores=await ProveedorModel.find();
        return proveedores;
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de datos al listar los proveedores");
    }
}
