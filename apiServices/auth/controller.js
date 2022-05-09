const { httpError } = require("../../helpers/handleError");
const {registrarUsuarioService, registrarProveedorService, loginUsuarioService, loginProveedorService, confirmAccountService } = require("../../services/auth");

exports.registerUsuario=async(req,res)=>{
    try{
        const fields=req.body;
        const result=await registrarUsuarioService(fields);
        if(result.error)return res.status(400).send({message:result.message,error:result.error});
        return res.status(200).send(result)
    }catch(err){
        httpError(res,err);
    }
}
exports.registerProveedor=async(req,res)=>{
    try{
        const fields=req.body;
        const {message,error}=await registrarProveedorService(fields);
        if(error)return res.send({message,error});
        return res.send({
            message
        })
    }catch(err){
        httpError(res,err);
    }
}
exports.loginProveedor=async(req,res)=>{
    try{
        const fields=req.body;
        const hash=req.hash;
        const {message,error,token}=await loginProveedorService({...fields,hash});
        if(err)return res.send({message,error});
        return res.send({
            message,
            token
        })
    }catch(err){
        httpError(res,err);
    }
}
exports.loginUsuario=async(req,res)=>{
    try{
        const fields=req.body;
        const response=await loginUsuarioService(fields);
        if(response.error)return res.status(400).send({message:response.message,error:response.error});
        return res.status(200).send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.confirmAccount=async(req,res)=>{
    try{
        const fields=req.body;
        const result=await confirmAccountService(fields);
        if(result.error)return res.status(400).send({message:result.message,error:result.error});
        return res.status(200).send(result);
    }catch(err){
        httpError(res,err);
    }
}