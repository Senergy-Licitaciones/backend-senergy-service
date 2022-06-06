const { updateLicitacionDao } = require("../../dao/licitacion");
const { crearOfertaDao } = require("../../dao/oferta");
const { updateProveedorDao, getProveedoresDao } = require("../../dao/proveedor");
const { handleError, httpError } = require("../../helpers/handleError")

const participarLicitacionService=async(fields)=>{
    try{
        const {potencia,energiaHp,energiaHfp,potenciaFacturar,formulaIndexPotencia,formulaIndexEnergia,potMinFacturable,excesoPotencia,idLicitacion,idProveedor}=fields;
        const oferta=await crearOfertaDao({potencia,energiaHfp,energiaHp,potenciaFacturar,formulaIndexPotencia,formulaIndexEnergia,potMinFacturable,excesoPotencia,proveedor:idProveedor,licitacion:idLicitacion});
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
const getProveedoresService=async()=>{
    try{
        const proveedores=await getProveedoresDao(); 
        if(proveedores.error)return handleError(proveedores.error,proveedores.message);
        return proveedores
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios al listar los proveedores");
    }
}
module.exports={getProveedoresService,participarLicitacionService}