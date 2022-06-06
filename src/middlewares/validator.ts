import { RequestHandler } from "express";
import { body, validationResult } from "express-validator";
export const validateUserLogin:RequestHandler=async(req,res,next)=>{
    await Promise.all([body("correo").isEmail().isLength({max:32}).run(req),
    body("password").exists({checkFalsy:true,checkNull:true}).isLength({min:8,max:16}).run(req)]);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({
            message:"Datos inválidos",
            error:errors.array()
        });
    }
    return next();
}
export const validateUserRegister:RequestHandler=async(req,res,next)=>{
    await Promise.all([body("correo").isEmail().isLength({max:32}).run(req),
body("password").exists({checkFalsy:true,checkNull:true}).isLength({max:16,min:8}).run(req),
body("empresa").exists({checkFalsy:true,checkNull:true}).isLength({max:32}).run(req),
body("ruc").exists({checkFalsy:true,checkNull:true}).isLength({max:11,min:11}).run(req),
body("phone").isMobilePhone("es-PE").run(req),
body("address").exists({checkFalsy:true,checkNull:true}).isLength({max:64}).run(req)]);
const errors=validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).send({
        message:"Datos inválidos",
        error:errors.array()
    })
}
return next();
}
export const validateCode:RequestHandler=async(req,res,next)=>{
    await Promise.all([body("code").exists({checkFalsy:true,checkNull:true}).isLength({min:6,max:6}).run(req),
    body("idUser").exists({checkFalsy:true,checkNull:true}).isLength({min:24,max:24}).run(req)]);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({
            message:"Datos inválidos",
            error:errors.array()
        });
    }
    return next();
}
