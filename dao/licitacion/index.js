const { handleError } = require("../../helpers/handleError")
const LicitacionModel=require("../../apiServices/licitacion/model");
const showLicitacionesDao=async()=>{
    try{
        const licitaciones=await LicitacionModel.find();
        return licitaciones;
    }catch(err){
        handleError(err,"Ha ocurrido un error en la capa de datos")
    }
}
const createLicitacionDao=async(fields)=>{
    try{
        await LicitacionModel.create({...fields});
        return{
            message:"Licitacion creada exitosamente"
        }
    }catch(err){
        handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
const updateLicitacionDao=async(fields,id)=>{
    try{
        const result=await LicitacionModel.findByIdAndUpdate(id,{...fields},{new:true});
        return{
            message:`Licitación: ${result.title} ,actualizada exitosamente`
        }
    }catch(err){
        handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
module.exports={showLicitacionesDao,createLicitacionDao,updateLicitacionDao}