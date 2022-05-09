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
        if(info.err)return handleError(info.err,"Error ocurrido al enviar emails");
        return{
            message:"Emails enviados exitosamente"
        }
    }catch(err){
       return handleError(err,"Ha ocurrido un error en la capa de servicios")
    }
}
const sendCodeVerification=async(code,correo)=>{
    try{
        let info=await transporter.sendMail({
            from: '"Prysmo Solutions" <equipo.servicio@prysmosolutions.com>', // sender address
            to:correo, // list of receivers
            subject:`Código de verificación para registro `, // Subject line
            html: `<b> Código de verificación. Expira en 4 minutos</b>
            <br/> 
            <h1> ${code} </h1>
             <br/>
             <h2>Si no solicitaste esta acción repórtalo en: ${process.env.CORREO_SOPORTE}</h2>`,
        });
        return{
            message:"Email enviado exitosamente"
        }
    }catch(err){
        return handleError(err,"Ha ocurrido un error al intentar enviar el email");
    }
}
module.exports={sendEmails,sendCodeVerification}