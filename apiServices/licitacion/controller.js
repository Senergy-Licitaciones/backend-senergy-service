const { httpError } = require("../../helpers/handleError");
const { mostrarLicitacionesService, crearLicitacionService, updateLicitacionService, getTiposService } = require("../../services/licitacion");
const { formatFileLicitacion } = require("../../utils/nameFormat");
const fs=require("fs");
const { sendEmails } = require("../../services/emails");
exports.showLicitaciones=async(req,res)=>{
    try{
        const result=await mostrarLicitacionesService();
        if(result.error)return res.status(400).send({
            message:result.message,
            error:result.error
        });
        return res.status(200).send(result);
    }catch(err){
        httpError(res,err)
    }
}
exports.createLicitacion=async(req,res)=>{
    try{
        const fields=req.body;
        const result=await crearLicitacionService(fields);
        if(result.error)return res.status(400).send({message:result.message,error:result.error});
        
        return res.status(200).send({
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
exports.getTipos=async(req,res)=>{
    try{
        const id=req.user;
        const result=await getTiposService(id);
        if(result.error) return res.status(400).send({
            message:result.message,
            error:result.error
        });
        return res.status(200).send(result);
    }catch(err){
        httpError(res,err);
    }
}
exports.showFile=(req,res)=>{
    try{
        const path=req.pathFilename;
        if(fs.readFileSync(path)){
            res.contentType("application/pdf");
            fs.createReadStream(path).pipe(res)
        }else{
            return res.send({
                message:"No existe el archivo"
            })
        }
    }catch(err){
        console.log("error",err);
        httpError(res,err);
    }
}
exports.findFilename=(req,res,next,id)=>{
    req.pathFilename=`uploads/pdfs/${id}`;
    next();
}
