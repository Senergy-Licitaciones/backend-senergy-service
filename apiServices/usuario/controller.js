const transporter = require("../../config/mailer");
const { httpError } = require("../../helpers/handleError")

exports.changeStatus=(req,res)=>{
    try{

    }catch(err){
        httpError(res,err);
    }
}
