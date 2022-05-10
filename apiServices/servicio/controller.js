const { httpError } = require("../../helpers/handleError");
const { getServiciosService, addServicioService } = require("../../services/servicio");

exports.getServicios=async(req,res)=>{
    try{
        const result=await getServiciosService();
        if(result.error)return res.status(400).send({message:result.message,error:result.error});
        return res.status(200).send(result);
    }catch(err){
        httpError(res,err);
    }
}
exports.addServicio=async(req,res)=>{
    try{
        const fields=req.body;
        const response=await addServicioService(fields);
        if(response.error)return res.status(400).send(response);
        return res.status(200).send(response);
    }catch(err){
        httpError(res,err);
    }
}