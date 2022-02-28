const { httpError } = require("../../helpers/handleError");
const {registrarUsuarioService, registrarProveedorService, loginUsuarioService, loginProveedorService } = require("../../services/auth");

exports.registerUsuario=async(req,res)=>{
    try{
        const fields=req.body;
        const {message,error}=await registrarUsuarioService(fields);
        if(error)return res.send({message,error});
        return res.send({
            message
        })
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
        const hash=req.hash;
        const {message,error,token}=await loginUsuarioService({...fields,hash});
        if(error)return res.send({message,error});
        return res.send({
            message,
            token
        })
    }catch(err){
        httpError(res,err);
    }
}