const bcrypt=require("bcryptjs");
const { handleError } = require("./handleError");

const encrypt=async(password)=>{
    try{
        const hash= await bcrypt.hash(password,10);
        return hash;
    }catch(err){
        handleError(err,"Ha ocurrido un error al momento de encriptar la contraseña")
    }
}
const compare=async(password,hash)=>{
    try{
        const res=await bcrypt.compare(password,hash);
        return res
    }catch(err){
        handleError(err,"Ha ocurrido un error al verificar la contraseña")
    }
}
module.exports={encrypt,compare}