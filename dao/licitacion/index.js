const { handleError } = require("../../helpers/handleError")
const LicitacionModel=require("../../apiServices/licitacion/model");
const showLicitacionesDao=async()=>{
    try{
        const licitaciones=await LicitacionModel.find().populate("tipoServicio");
        return licitaciones;
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos")
    }
}
const createLicitacionDao=async(fields)=>{
    try{
        await LicitacionModel.create({...fields});
        return{
            message:"Licitacion creada exitosamente"
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
const updateLicitacionDao=async(fields,id)=>{
    try{
        const result=await LicitacionModel.findByIdAndUpdate(id,{...fields},{new:true});
        if(!result)return handleError(true,"No se encontró la licitación");
        return result;
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
const getTiposDao=async(id)=>{
    try{
        const result=await LicitacionModel.find({usuario:id}).select("-participantes -usuario -puntoSum -brg -meses -tipoServicio");
        return result
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos");
    }
}
const getLicitacionesFreeDao=async(proveedorId)=>{
    try{
        const licitaciones=await LicitacionModel.find({
            $nor:[{"participantes":proveedorId}]
        }).populate("tipoServicio");
        return licitaciones;
    }catch(err){
        console.log("error ",err);
        return handleError(err,"Ha ocurrido un error en la capa de datos al obtener licitaciones libres");
    }
}
const getLicitacionByIdDao=async(id)=>{
    try{
        const licitacion=await LicitacionModel.findById(id).select("-usuario -participantes").populate("tipoServicio puntoSum brg");
        if(!licitacion) return handleError(true,"La licitación no existe");
        return licitacion
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos al mostrar la licitación ");
    }
}
module.exports={getLicitacionByIdDao,getLicitacionesFreeDao,getTiposDao,showLicitacionesDao,createLicitacionDao,updateLicitacionDao}