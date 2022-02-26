const { httpError } = require("../../helpers/handleError");
const { mostrarLicitacionesService, crearLicitacionService, updateLicitacionService } = require("../../services/licitacion");

exports.showLicitaciones=async(req,res)=>{
    try{
        const result=await mostrarLicitacionesService();
        if(result.error)return res.send({
            message:result.message,
            error:result.error
        });
        return res.send(result);
    }catch(err){
        httpError(res,err)
    }
}
exports.createLicitacion=async(req,res)=>{
    try{
        const fields=req.body;
        const result=await crearLicitacionService(fields);
        if(result.error)return res.send({message:result.message,error:result.error});
        return res.send({
            message:result.message
        })
    }catch(err){
        httpError(res,err);
    }
}
exports.updateLicitacion=async(req,res)=>{
    try{
        const {fields,id}=req.body;
        const result=await updateLicitacionService(fields,id);
        if(result.error)return res.send({message:result.message,error:result.error});
        return res.send({message:result.message})
    }catch(err){
        httpError(res,err);
    }
}