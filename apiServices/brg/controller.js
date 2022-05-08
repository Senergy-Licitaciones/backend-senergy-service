const { httpError } = require("../../helpers/handleError");
const { getBrgService } = require("../../services/brg");

exports.getBrg=async(req,res)=>{
    try{
        const result=await getBrgService();
        if(result.error)return res.status(400).send({message:result.message,error:result.error});
        return res.status(200).send(result);
    }catch(err){
        httpError(res,err)
    }
}