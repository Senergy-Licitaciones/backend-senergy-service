const { httpError } = require("../../helpers/handleError");
const { participarLicitacionService, getProveedoresService } = require("../../services/proveedor");

exports.participarLicitacion=async(req,res)=>{
    try{
        const proveedor=req.proveedor;
        const fields=req.body;
        const result=await participarLicitacionService({...fields,idProveedor:proveedor._id});
        if(result.error)return res.status(400).send(result);
        return res.status(200).send(result);
    }catch(err){
        httpError(res,err);
    }
}
exports.showProveedores=async(req,res)=>{
    try{
        const proveedores=await getProveedoresService();
        if(proveedores.error)return res.status(400).send(proveedores);
        return res.status(200).send(proveedores);
    }catch(err){
        httpError(res,err);
    }
}