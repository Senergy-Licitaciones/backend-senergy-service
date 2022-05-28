const { updateLicitacionDao } = require("../../dao/licitacion");
const { crearOfertaDao } = require("../../dao/oferta");
const { updateProveedorDao } = require("../../dao/proveedor");
const { handleError } = require("../../helpers/handleError")

const participarLicitacionService=async(fields)=>{
    try{
        const {potencia,energiaHp,energiaHfp,potenciaFacturar,formulaIndex,potMinFacturable,excesoPotencia,idLicitacion,idProveedor}=fields;
        const oferta=await crearOfertaDao({potencia,energiaHfp,energiaHp,potenciaFacturar,formulaIndex,potMinFacturable,excesoPotencia,proveedor:idProveedor,licitacion:idLicitacion});
        if(oferta.error)return handleError(oferta.error,oferta.message);
        const licitacion=await updateLicitacionDao({$push:{participantes:idProveedor}},idLicitacion);
        if(licitacion.error)return handleError(licitacion.error,licitacion.message);
        const proveedor=await updateProveedorDao({$push:{licitaciones:idLicitacion}},idProveedor);
        if(proveedor.error)return handleError(proveedor.error,proveedor.message);
        return{
            message:"Se ha inscrito en la licitación exitosamente"
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios");
    }
}
module.exports={participarLicitacionService}