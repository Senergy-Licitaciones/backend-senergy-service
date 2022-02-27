const transporter = require("../../config/mailer");
const { handleError } = require("../../helpers/handleError");

const sendEmails=async(fields)=>{
    try{
        let info=await transporter.sendMail({
            from: '"Prysmo Solutions" <equipo.servicio@prysmosolutions.com>', // sender address
            to: "mjfura27@gmail.com", // list of receivers
            subject: "Invitación a Licitación AntarRed", // Subject line
            html: `<b>Felicidades, AntarRed te invita a participar de su licitación</b>
            <br/> 
            <p>Puedes participar ingresando aqui</p>
             <br/>
             <h1>Si aún no posees una cuenta puedes registrarte aqui</h1>`, 
            });
    }catch(err){
        handleError(err,"Ha ocurrido un error en la capa de servicios")
    }
}
module.exports={sendEmails}