import { ObjectId } from "mongoose";
import { updateLicitacionDao } from "../../dao/licitacion";
import { crearOfertaDao } from "../../dao/oferta";
import { updateProveedorDao, getProveedoresDao } from "../../dao/proveedor";
import { handleError} from "../../helpers/handleError";
import { OfertaCreateFields } from "../../types/form";

export const participarLicitacionService=async(fields:OfertaCreateFields,idProveedor:ObjectId)=>{
    try{
        const {potencia,energiaHp,energiaHfp,potenciaFacturar,formulaIndexPotencia,formulaIndexEnergia,potMinFacturable,licitacion,excesoPotencia}=fields;
        const oferta=await crearOfertaDao({potencia,energiaHfp,energiaHp,potenciaFacturar,formulaIndexPotencia,formulaIndexEnergia,potMinFacturable,excesoPotencia,proveedor:idProveedor,licitacion});
        if("error" in oferta)return handleError(oferta.error,oferta.message);
        const result=await updateLicitacionDao({$push:{participantes:idProveedor}},licitacion);
        if(result.error)return handleError(result.error,result.message);
        const proveedor=await updateProveedorDao({$push:{licitaciones:licitacion}},idProveedor);
        if(proveedor.error)return handleError(proveedor.error,proveedor.message);
        return{
            message:"Se ha inscrito en la licitación exitosamente"
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios");
    }
}
export const getProveedoresService=async()=>{
    try{
        const proveedores=await getProveedoresDao(); 
        if("error" in proveedores)return handleError(proveedores.error,proveedores.message);
        return proveedores
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios al listar los proveedores");
    }
}
