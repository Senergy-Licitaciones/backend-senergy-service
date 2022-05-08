const { httpError } = require("../../helpers/handleError");
const { getServiciosService } = require("../../services/servicio");

exports.getServicios=async(req,res)=>{
    try{
        const result=await getServiciosService();
        if(result.error)return res.status(400).send({message:result.message,error:result.error});
        return res.status(200).send(result);
    }catch(err){
        httpError(res,err);
    }
}