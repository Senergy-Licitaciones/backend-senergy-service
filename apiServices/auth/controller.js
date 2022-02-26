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
        const {message,error}=await loginProveedorService(fields);
        if(err)return res.send({message,error});
        return res.send({
            message
        })
    }catch(err){
        httpError(res,err);
    }
}
exports.loginUsuario=async(req,res)=>{
    try{
        const fields=req.body;
        const {message,error}=await loginUsuarioService(fields);
        if(error)return res.send({message,error});
        return res.send({
            message
        })
    }catch(err){
        httpError(res,err);
    }
}