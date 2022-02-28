const { httpError } = require("../../helpers/handleError");
const { changeStatusService } = require("../../services/usuario");

exports.changeStatus=async(req,res)=>{
    try{
        const {estado,idLicitacion}=req.body;
        const result=await changeStatusService(estado,idLicitacion);
        if(result.error)return res.send({message:result.message,error:result.error});
        res.send({
            message:result.message
        })
    }catch(err){
        httpError(res,err);
    }
}
