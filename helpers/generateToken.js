const jwt=require("jsonwebtoken");
require("dotenv").config();
const tokenSignUser=(user)=>{
    return jwt.sign({
        _id:user._id,
        nombre:user.nombre,
        razSocial:user.razSocial,
        correo:user.correo
    },
    process.env.JWT_SECRET,
    {
        expiresIn:"2h"
    })
}
const tokenSignProveedor=(proveedor)=>{
    return jwt.sign({
        _id:proveedor._id,
        razSocial:proveedor.razSocial,
        correo:proveedor.correo,
        licitaciones:proveedor.licitaciones
    },process.env.JWT_SECRET,{
        expiresIn:"2h"
    })
}
const verifyToken=async(token)=>{
    try{
        return jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        return null
    }
}
module.exports={tokenSignUser,tokenSignProveedor,verifyToken}