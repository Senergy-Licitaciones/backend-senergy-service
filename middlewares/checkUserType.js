const { verifyToken } = require("../helpers/generateToken");
const UsuarioModel=require("../apiServices/usuario/model");
const ProveedorModel=require("../apiServices/proveedor/model");
const checkUserType=(types)=>async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ").pop();
        const tokenData=await verifyToken(token);
        if(!tokenData) return res.status(400).send({
            error:true,
            message:"Token inválido"
        });
        if([].concat(types).includes(tokenData.type)){
            if(tokenData.type==="user"){
                const user=await UsuarioModel.findById(tokenData._id);
                if(!user)return res.status(400).send({message:"Usuario sin permisos",error:true});
                if(user.estado==="offline")return res.status(400).send({message:"Debe iniciar sesión",error:true})
                req.user=user;
            }else{
                const proveedor=await ProveedorModel.findById(tokenData._id);
                if(!proveedor) return res.status(400).send({message:"Usuario sin permisos",error:true})
                req.proveedor=proveedor;
            }
            next();
        }else{
            return res.status(400).send({
                error:true,
                message:"No tiene permisos para realizar esta acción"
            })
        }
    }catch(err){
        return res.status(500).send("Ha ocurrido un error en la autenticación");
    }
}

module.exports=checkUserType;