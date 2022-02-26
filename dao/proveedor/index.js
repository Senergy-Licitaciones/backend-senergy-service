const { handleError } = require("../../helpers/handleError")
const ProveedorModel=require("../../apiServices/proveedor/model");
const crearProveedorDao=async(fields)=>{
    try{
        await ProveedorModel.create({...fields});
        return{
            message:"Proveedor creado exitosamente"
        }
    }catch(err){
        handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
const updateProveedorDao=async(fields,id)=>{
    try{
        const result=await ProveedorModel.findByIdAndUpdate(id,{...fields},{new:true});
        return{
            message:`Proveedor ${result.correo} actualizado exitosamente`
        }
    }catch(err){
        handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
module.exports={crearProveedorDao,updateProveedorDao}