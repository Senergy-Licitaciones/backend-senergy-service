const nodemailer=require("nodemailer");
require("dotenv").config();

const transporter=nodemailer.createTransport({
  host: "smtp.titan.email",
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});
transporter.verify().then(()=>{
    console.log("Listo para enviar email");
}).catch((err)=>{
    console.log("Error al iniciar nodemailer",err);
})
module.exports=transporter