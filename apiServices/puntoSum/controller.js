const { httpError } = require("../../helpers/handleError");
const { getPuntoSumService, addPuntoSumService } = require("../../services/puntoSum");

exports.getPuntoSum=async(req,res)=>{
    try{
        const result=await getPuntoSumService();
        if(result.error)return res.status(400).send({message:result.message,error:result.error});
        return res.status(200).send(result)
    }catch(err){
        httpError(res,err);
    }
}
exports.addPuntoSum=async(req,res)=>{
    try{
        const fields=req.body;
        const response=await addPuntoSumService(fields);
        if(response.error)return res.status(400).send({message:response.message,error:response.error});
        return res.status(200).send(response);
    }catch(err){
        httpError(res,err);
    }
}