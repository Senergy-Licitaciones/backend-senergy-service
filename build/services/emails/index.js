"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCodeVerification = void 0;
const mailer_1 = __importDefault(require("../../config/mailer"));
const handleError_1 = require("../../helpers/handleError");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
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
const sendCodeVerification = (fields) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, correo } = fields;
        const info = yield mailer_1.default.sendMail({
            from: '"Senergy Soporte" <contacto@prysmosolutions.com>',
            to: correo,
            subject: 'Código de verificación para registro ',
            html: `<b> Código de verificación. Expira en 4 minutos</b>
            <br/> 
            <h1> ${code} </h1>
             <br/>
             <h2>Si no solicitaste esta acción repórtalo en: ${(process.env.CORREO_SOPORTE != null) ? process.env.CORREO_SOPORTE : 'En Mantenimiento'}</h2>`
        });
        console.log('info ', info);
        return {
            message: 'Email enviado exitosamente'
        };
    }
    catch (err) {
        const error = err;
        return (0, handleError_1.handleError)(error, 'Ha ocurrido un error al intentar enviar el email');
    }
});
exports.sendCodeVerification = sendCodeVerification;
