import transporter from '../../config/mailer'
import { handleError } from '../../helpers/handleError'
import { config } from 'dotenv'
import { Service } from '../../types/methods'
import { ErrorResponse, ResponseParent } from '../../types/data'
config()
/* export const sendEmails=async(fields)=>{
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
} */
export const sendCodeVerification: Service<{code: string, correo: string}, ErrorResponse|ResponseParent> = async (fields) => {
  try {
    const { code, correo } = fields
    const info = await transporter.sendMail({
      from: '"Senergy Soporte" <contacto@prysmosolutions.com>', // sender address
      to: correo, // list of receivers
      subject: 'Código de verificación para registro ', // Subject line
      html: `<b> Código de verificación. Expira en 4 minutos</b>
            <br/> 
            <h1> ${code} </h1>
             <br/>
             <h2>Si no solicitaste esta acción repórtalo en: ${(process.env.CORREO_SOPORTE != null) ? process.env.CORREO_SOPORTE : 'En Mantenimiento'}</h2>`
    })
    console.log('info ', info)
    return {
      message: 'Email enviado exitosamente'
    }
  } catch (err) {
    const error = err as Error
    return handleError(error, 'Ha ocurrido un error al intentar enviar el email')
  }
}
