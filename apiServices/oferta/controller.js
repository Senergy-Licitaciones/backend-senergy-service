const { httpError } = require("../../helpers/handleError");
const { getOfertasService, getOfertaByIdService, updateOfertaService } = require("../../services/oferta");

exports.getOfertas=async(req,res)=>{
    try{
        const proveedor=req.proveedor;
        const ofertas=await getOfertasService(proveedor._id);
        if(ofertas.error)return res.status(400).send(ofertas);
        return res.status(200).send(ofertas);
    }catch(err){
        httpError(res,err);
    }
}
exports.getOfertaById=async(req,res)=>{
    try{
        const ofertaId=req.ofertaId;
        const oferta=await getOfertaByIdService(ofertaId);
        if(oferta.error) return res.status(400).send(oferta);
        return res.status(200).send(oferta);
    }catch(err){
        httpError(res,err);
    }
}
exports.ofertaId=(req,res,next,id)=>{
    req.ofertaId=id;
    next();
}
exports.updateOferta=async(req,res)=>{
    try{
        const ofertaId=req.ofertaId,
        fields=req.body;
        const response=await updateOfertaService(ofertaId,fields);
        if(response.error)return res.status(400).send(response);
        return res.status(200).send(response);
    }catch(err){
        httpError(res,err);
    }
}