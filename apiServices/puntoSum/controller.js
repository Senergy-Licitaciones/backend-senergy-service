const { httpError } = require("../../helpers/handleError");
const { getPuntoSumService } = require("../../services/puntoSum");

exports.getPuntoSum=async(req,res)=>{
    try{
        const result=await getPuntoSumService();
        if(result.error)return res.status(400).send({message:result.message,error:result.error});
        return res.status(200).send(result)
    }catch(err){
        httpError(res,err);
    }
}