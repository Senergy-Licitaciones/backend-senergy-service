import { Document, ObjectId, Types } from "mongoose";
import { updateLicitacionDao } from "../../dao/licitacion";
import { crearOfertaDao } from "../../dao/oferta";
import { updateProveedorDao, getProveedoresDao } from "../../dao/proveedor";
import { handleError} from "../../helpers/handleError";
import { ErrorResponse, Oferta, Proveedor, ResponseParent } from "../../types/data";
import { Service, ServiceWithoutParam } from "../../types/methods";

export const participarLicitacionService:Service<{fields:Oferta,idProveedor:ObjectId},ErrorResponse|ResponseParent>=async({fields,idProveedor})=>{
    try{
        const {potencia,energiaHp,energiaHfp,potenciaFacturar,formulaIndexPotencia,formulaIndexEnergia,potMinFacturable,licitacion,excesoPotencia}=fields;
        const oferta=await crearOfertaDao({potencia,energiaHfp,energiaHp,potenciaFacturar,formulaIndexPotencia,formulaIndexEnergia,potMinFacturable,excesoPotencia,proveedor:idProveedor,licitacion});
        if("error" in oferta)return handleError(oferta.error,oferta.message);
        const result=await updateLicitacionDao({fields:{$push:{participantes:idProveedor}},id:licitacion});
        if("error" in result)return handleError(result.error,result.message);
        const proveedor=await updateProveedorDao({fields:{$push:{licitaciones:licitacion}},id:idProveedor});
        if("error" in proveedor)return handleError(proveedor.error,proveedor.message);
        return{
            message:"Se ha inscrito en la licitación exitosamente"
        }
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios");
    }
}
export const getProveedoresService:ServiceWithoutParam<ErrorResponse|Array<Document<any, any, Proveedor> & Proveedor & {
    _id: Types.ObjectId}>>=async()=>{
    try{
        const proveedores=await getProveedoresDao(); 
        if("error" in proveedores)return handleError(proveedores.error,proveedores.message);
        return proveedores
    }catch(err){
        let error=err as Error;
        return handleError(error,"Ha ocurrido un error en la capa de servicios al listar los proveedores");
    }
}