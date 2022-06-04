const OfertaModel=require("../../apiServices/oferta/model");
const { handleError } = require("../../helpers/handleError");
const crearOfertaDao=async(fields)=>{
    try{
        const oferta=await OfertaModel.create(fields);
        const result=await oferta.save();
        return result;
    }catch(err){
        console.log("error ",err);
        return handleError(err,"Ha ocurrido un error en la capa de datos al crear la oferta");
    }
}
const getOfertasDao=async(id)=>{
    try{
        const ofertas=await OfertaModel.find({
            proveedor:id
        }).populate("licitacion");
        return ofertas;
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos al obtener las ofertas")
    }
}
module.exports={crearOfertaDao,getOfertasDao}