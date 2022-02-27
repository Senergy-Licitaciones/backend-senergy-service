const { httpError } = require("../../helpers/handleError");
const { participarLicitacionService } = require("../../services/proveedor");

exports.participarLicitacion=async(req,res)=>{
    try{
        const {idProveedor,idLicitacion}=req.body;
        const result=await participarLicitacionService(idProveedor,idLicitacion);
        if(result.error)return res.send({message:result.message,error:result.error});
        return res.send({
            message:result.message
        })
    }catch(err){
        httpError(res,err);
    }
}