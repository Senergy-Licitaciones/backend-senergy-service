const { updateLicitacionDao } = require("../../dao/licitacion");
const { updateProveedorDao } = require("../../dao/proveedor");
const { handleError } = require("../../helpers/handleError")

const participarLicitacionService=async(fields)=>{
    try{

        const oferta=await crearOfertaDao(fields);
        if(oferta.error)return handleError(oferta.error,oferta.message);
        const licitacion=await updateLicitacionDao({$push:{participantes:fields.idProveedor}},fields.idLicitacion);
        if(licitacion.error)return handleError(licitacion.error,licitacion.message);
        const proveedor=await updateProveedorDao({$push:{licitaciones:fields.idLicitacion}},fields.idProveedor);
        if(proveedor.error)return handleError(proveedor.error,proveedor.message);
        return{
            message:"Se ha inscrito en la licitación exitosamente"
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
module.exports={participarLicitacionService}