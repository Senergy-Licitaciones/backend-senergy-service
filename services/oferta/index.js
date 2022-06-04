const { handleError } = require("../../helpers/handleError");

const getOfertasService=async(id)=>{
    try{
        const ofertas=await getOfertasDao(id);//falta
        if(ofertas.error)return handleError(ofertas.error,ofertas.message);
        return ofertas
    }catch(err){
        return handleError(err,"Ha ocurrido un error en la capa de servicios al obtener las ofertas")
    }
}
module.exports={getOfertasService};