const { httpError } = require("../../helpers/handleError");
const { getBrgService, addBrgService } = require("../../services/brg");

exports.getBrg=async(req,res)=>{
    try{
        const result=await getBrgService();
        if(result.error)return res.status(400).send({message:result.message,error:result.error});
        return res.status(200).send(result);
    }catch(err){
        httpError(res,err)
    }
}
exports.addBrg=async(req,res)=>{
    try{
        const fields=req.body;
        const response=await addBrgService(fields);
        if(response.error)return res.status(400).send({message:response.message,error:response.error});
        return res.status(200).send(response);
    }catch(err){
        httpError(res,err);
    }
}