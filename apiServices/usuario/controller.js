const { httpError } = require("../../helpers/handleError");
const { changeStatusService, getUsersService } = require("../../services/usuario");

exports.changeStatus=async(req,res)=>{
    try{
        const {estado,idLicitacion}=req.body;
        const result=await changeStatusService(estado,idLicitacion);
        if(result.error)return res.send({message:result.message,error:result.error});
        res.send({
            message:result.message
        })
    }catch(err){
        httpError(res,err);
    }
}
exports.showUsers=async(req,res)=>{
    try{
        const users=await getUsersService();
        if(users.error)return res.status(400).send(users);
        return res.status(200).send(users);
    }catch(err){
        httpError(res,err);
    }
}