const { handleError } = require("../../helpers/handleError")
const ProveedorModel=require("../../apiServices/proveedor/model");
const crearProveedorDao=async(fields)=>{
    try{
        const response=await ProveedorModel.create({...fields});
        const proveedor=await response.save();
        return proveedor
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
const updateProveedorDao=async(fields,id)=>{
    try{
        const result=await ProveedorModel.findByIdAndUpdate(id,{...fields},{new:true});
        if(!result) return handleError(true,"Cuenta inexistente")
        return result
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
const verifyCorreoProveedorDao=async(correo)=>{
    try{
        const response=await ProveedorModel.findOne({correo});
        if(response) return handleError(true,"Correo ya usado");
        return{
            message:"Correo disponible"
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error al verificar el correo")
    }
}
const confirmProveedorDao=async(idCode)=>{
    try{
        const response=await ProveedorModel.findOneAndUpdate({
            codeToConfirm:idCode,
        verified:false},{codeToConfirm:null,
            verified:true
        },{new:true});
        if(!response)return handleError(true,"No se pudo encontrar la cuenta a confirmar");
        return response;
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la actualizacion del proveedor");
    }
}
const proveedorEstadoDao=async(correo)=>{
    try{
        const proveedor=await ProveedorModel.findOne({correo,verified:true, estado:"offline"});
        if(!proveedor) return handleError(true,"Los datos son inválidos");
        return proveedor
    }catch(err){
        return handleError(err,"Ha ocurrido un error al verificar la cuenta")
    }
}
module.exports={proveedorEstadoDao,confirmProveedorDao,crearProveedorDao,updateProveedorDao,verifyCorreoProveedorDao}