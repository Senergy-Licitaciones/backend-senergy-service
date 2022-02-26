const { httpError } = require("../../helpers/handleError");
const { participarLicitacionService } = require("../../services/proveedor");

exports.participarLicitacion=async(req,res)=>{
    try{
        const {fields,id}=req.body;
        const result=await participarLicitacionService(fields,id);
        if(result.error)return res.send({message:result.message,error:result.error});
        return res.send({
            message:result.message
        })
    }catch(err){
        httpError(res,err);
    }
}