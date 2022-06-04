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
const getOfertaByIdDao=async(ofertaId)=>{
    try{
        const oferta=await OfertaModel.findById(ofertaId);
        if(!oferta) return handleError(true,"No existe la oferta solicitada");
        return oferta
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos al obtener la oferta");
    }
}
const updateOfertaDao=async(ofertaId,fields)=>{
    try{
        const date=new Date.now();
        const oferta=await OfertaModel.findById(ofertaId).populate("licitacion");
        if(!oferta)return handleError(true,"La oferta seleccionada no existe");
        if(oferta.licitacion.fechaFinApertura>date)return handleError(true,"El plazo de tiempo para modificar esta oferta ya culminó");
        oferta={...oferta,fields};
        const result=await oferta.save();
        return result;
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de datos al actualizar la oferta");
    }
}
module.exports={updateOfertaDao,getOfertaByIdDao,crearOfertaDao,getOfertasDao}