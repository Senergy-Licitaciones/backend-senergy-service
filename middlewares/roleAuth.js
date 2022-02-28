const {verifyToken}=require("../helpers/generateToken");
const UsuarioModel=require("../apiServices/usuario/model");
const ProveedorModel=require("../apiServices/proveedor/model");
const checkRoleAuth=(roles)=>async(req,res,next)=>{
    try{
         const token=req.headers.authorization.split(" ").pop();
        const tokenData=await verifyToken(token);
        const user=await UserModel.findById(tokenData._id);
        if(user.role){
            req.hash=user.password;
            [].concat(roles).includes(user.role)?next():res.status(409).send({
            message:"No tiene permisos para realizar esta acción",
            error:true
        })
        }else{
            user=await ProveedorModel.findById(tokenData._id);
            req.hash=user.password;
            [].concat(roles).includes(user.role)?next():res.status(409).send({
            message:"No tiene permisos para realizar esta acción",
            error:true
        })
        }
        
    }catch(err){
        res.send({
            message:"Ha ocurrido un error en la autenticación",
            error:err
        })
    }
}
module.exports=checkRoleAuth;