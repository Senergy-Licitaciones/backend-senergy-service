import { RequestHandler } from "express";

import { verifyToken } from "../helpers/generateToken";
import { DataToken } from "../types/data";

const checkAuth:RequestHandler=async(req,res,next)=>{
    try{
        const auth=req.headers.authorization;
        if(!auth) throw new Error("Token no ingresado");
        const token=auth.split(" ").pop();
        if(!token) throw new Error("Token inválido");
        const tokenData=verifyToken(token) as DataToken ;
        if(!tokenData._id) return res.status(409).send({message:"No ha iniciado sesión",error:true});
        return next();
    }catch(err){
        return res.status(409).send({
            message:"Ha ocurrido un error en el proceso de autenticación",
            error:err
        })
    }
}
export default checkAuth