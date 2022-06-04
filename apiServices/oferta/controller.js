const { httpError } = require("../../helpers/handleError")

exports.getOfertas=async(req,res)=>{
    try{
        const proveedor=req.proveedor;
        const ofertas=await getOfertasService(proveedor._id);//falta
        if(ofertas.error)return res.status(400).send(ofertas);
        return res.status(200).send(ofertas);
    }catch(err){
        httpError(res,err);
    }
}