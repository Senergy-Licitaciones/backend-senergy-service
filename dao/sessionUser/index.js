const SessionUserModel=require("../../apiServices/sessionUser/model");
const UsuarioModel=require("../../apiServices/usuario/model");
SessionUserModel.watch().on("change",(change)=>{
    if(change.operationType==="delete"){
        const closeSession=async()=>{
            await UsuarioModel.findOneAndUpdate({session:change.documentKey._id},{estado:"offline",session:null});
        }
        closeSession();
    }
});
const {handleError}=require("../../helpers/handleError");
const createSessionUser=async(idUser,token)=>{
    try{
        const response=await SessionUserModel.create({user:idUser,jwt:token});
        const session=await response.save();
        return{
            message:"Sesión creada exitosamente",
            id:session._id
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error al crear la sesión");
    }
}
const logoutUserDao=async(id)=>{
    try{
        const response=await SessionUserModel.findOneAndDelete({user:id});

        return{
            message:"Sesión cerrada exitosamente"
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error al cerrar sesión con los datos");
    }
}

module.exports={logoutUserDao,createSessionUser}