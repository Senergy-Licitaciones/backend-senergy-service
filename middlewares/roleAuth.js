const checkRoleAuth=(roles)=>async(req,res,next)=>{
    try{
        const proveedor=req.proveedor;
        const user=req.user;
        if(proveedor)[].concat(roles).includes(proveedor.role)?next():res.status(409).send({message:"Usuario sin permisos",error:true});
        if(user)[].concat(roles).includes(user.role)?next():res.status(409).send({message:"Proveedor sin permisos",error:true});
    }catch(err){
        return res.status(500).send({
            message:"Ha ocurrido un error en la autenticación",
            error:err
        })
    }
}
module.exports=checkRoleAuth;