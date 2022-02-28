const { verifyToken } = require("../helpers/generateToken");

const checkAuth=async(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(" ").pop();
        const tokenData= await verifyToken(token);
        tokenData._id?
        next()
        :res.status(409).send({message:"No tiene acceso a esta información",error:true});
    }catch(err){
        return res.send({
            message:"Ha ocurrido un error en el proceso de autenticación",
            error:err
        })
    }
}
module.exports=checkAuth