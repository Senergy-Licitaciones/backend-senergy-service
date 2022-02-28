const transporter = require("../../config/mailer");
const { handleError } = require("../../helpers/handleError");
require("dotenv").config();
const sendEmails=async(fields)=>{
    const {proveedoresList,enlace,usuario}=fields;
    try{
        let info=await transporter.sendMail({
            from: '"Prysmo Solutions" <equipo.servicio@prysmosolutions.com>', // sender address
            to:proveedoresList, // list of receivers
            subject:`Felicidades,${usuario} te invita a participar en su procesos de licitación `, // Subject line
            html: `<b>${usuario} acaba de registrar una nueva licitación y está interesado en tu participación</b>
            <br/> 
            <p>Puedes inscribirte en el prcceso </p><a href="${enlace}" target="_blank" >aquí</a>
             <br/>
             <h1>Si aún no posees una cuenta puedes registrarte </h1><a target="_blank" href="${WEB_REGISTRO_EMPRESA}" >aquí</a>`, 
            });
        if(info.err)handleError(info.err,"Error ocurrido al enviar emails");
        return{
            message:"Emails enviados exitosamente"
        }
    }catch(err){
        handleError(err,"Ha ocurrido un error en la capa de servicios")
    }
}
module.exports={sendEmails}