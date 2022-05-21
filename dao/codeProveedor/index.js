const { handleError } = require("../../helpers/handleError");
const ProveedorModel=require("../../apiServices/proveedor/model");
const CodeProveedorModel=require("../../apiServices/codeProveedor/model");
CodeProveedorModel.watch().on("change",(change)=>{
    if(change.operationType==="delete"){
        const removeProveedorAccount=async()=>{
            try{
                const response=await ProveedorModel.findOneAndDelete({codeToOCnfirm:change.documentKey._id,verified:false});
                if(!response) console.log("no existe la cuenta ",response);
                console.log("response ",response);
            }catch(err){
                console.log("error ocurrido al eliminar cuenta de proveedor ",err);
            }
        }
        removeProveedorAccount();
    }
})
const createCodeProveedorDao=async(fields)=>{
    try{
        const response=await CodeProveedorModel.create(fields);
        const code=await response.save();
        return code;
    }catch(err){
        return handleError(err,"Ha ocurrido un error al crear el código");
    }
}
const confirmCodeDao=async(correo,code)=>{
    try{
        const response=await CodeProveedorModel.findOne({proveedor:correo,code});
        if(!response) return handleError(true,"Código inválido");
        return response;
    }catch(err){
        return handleError(err,"Ha ocurrido un erro al encontrar el código");
    }
}
module.exports={createCodeProveedorDao,confirmCodeDao}