const { httpError } = require("../../helpers/handleError");
const {registrarUsuarioService, registrarProveedorService, loginUsuarioService, loginProveedorService, confirmAccountService, logoutUserService, confirmProveedorService, logoutProveedorService, loginAdminService } = require("../../services/auth");

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
        const result=await registrarProveedorService(fields);
        if(result.error)return res.status(400).send(result);
        return res.status(200).send(result);
    }catch(err){
        httpError(res,err);
    }
}
exports.loginProveedor=async(req,res)=>{
    try{
        const fields=req.body;
        const response=await loginProveedorService(fields);
        if(response.error)return res.status(400).send(response);
        return res.status(200).send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.loginUsuario=async(req,res)=>{
    try{
        const fields=req.body;
        const response=await loginUsuarioService(fields);
        if(response.error)return res.status(400).send(response);
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
exports.logoutUsuario=async(req,res)=>{
    try{
        const user=req.user,
        response=await logoutUserService(user._id);
        if(response.error)return res.status(400).send(response);
        return res.status(200).send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.confirmProveedorAccount=async(req,res)=>{
    try{
        const fields=req.body;
        const response=await confirmProveedorService(fields);
        if(response.error) return res.status(400).send(response);
        return res.status(200).send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.logoutProveedor=async(req,res)=>{
    try{
        const proveedor=req.proveedor;
        const response=await logoutProveedorService(proveedor._id);
        if(response.error) return res.status(400).send(response);
        return res.status(200).send(response);
    }catch(err){
        httpError(res,err);
    }
}
exports.loginAdmin=async(req,res)=>{
    try{
        const fields=req.body;
        const response=await loginAdminService(fields);
        if(response.error)return res.status(400).send(response);
        return res.status(200).send(response);
    }catch(err){
        httpError(res,err);
    }
}