const { updateLicitacionDao } = require("../../dao/licitacion");
const { updateProveedorDao } = require("../../dao/proveedor");
const { handleError } = require("../../helpers/handleError")

const participarLicitacionService=async(idProveedor,id)=>{
    try{
        const result=await updateLicitacionDao({licitaciones:[...licitaciones,idProveedor]},id);
        if(result.error)handleError(result.error,result.message);
        const resultProveedor=await updateProveedorDao({licitaciones:[...licitaciones,id]},idProveedor);
        if(resultProveedor.error)handleError(result.error,result.message);
        return{
            message:"Se ha inscrito en la licitación exitosamente"
        }
    }catch(err){
        handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
module.exports={participarLicitacionService}