const { handleError } = require("../../helpers/handleError")
const SessionProveedorModel=require("../../apiServices/sessionProveedor/model");
const ProveedorModel=require("../../apiServices/proveedor/model");
SessionProveedorModel.watch().on("change",(change)=>{
    if(change.operationType==="delete"){
        const closeSession=async()=>{
            await ProveedorModel.findOneAndUpdate({session:change.documentKey._id},{estado:"offline",session:""});
        }
        closeSession();
    }
});

const createSessionProveedor=async(proveedorId,token)=>{
    try{
        const response=await SessionProveedorModel.create({proveedor:proveedorId,jwt:token});
        const session=await response.save();
        return session;
    }catch(err){
        return handleError(err,"Ha ocurrido un error al crear la sesión ")
    }
}
const logoutProveedorDao=async(proveedorId)=>{
    try{
        const proveedor=await SessionProveedorModel.findOnedAndDelete({proveedor:proveedorId});
        if(!proveedor) return handleError(true,"La sesión no existe");
        return proveedor;
    }catch(err){
        return handleError(err,"Ha ocurrido un error al eliminar la sesión");
    }
}
module.exports={logoutProveedorDao,createSessionProveedor}