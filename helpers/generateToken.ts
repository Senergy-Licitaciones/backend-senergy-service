import jwt, {  Secret } from "jsonwebtoken";
import {config} from "dotenv";
import { SignToken, VerifyToken } from "../types/methods";
import { DataToken, Proveedor} from "../types/data";
config();
export const tokenSignUser:SignToken=(user)=>{
    return jwt.sign({
        _id:user._id,
        correo:user.correo,
        role:user.role,
        type:"user"
    },
    process.env.JWT_SECRET as Secret,
    {
        expiresIn:"1h"
    })
}
export const tokenSignProveedor:SignToken=(proveedor)=>{
    const provider=proveedor as Proveedor;
    return jwt.sign({
        _id:provider._id,
        razSocial:provider.razSocial,
        correo:provider.correo,
        ruc:provider.ruc,
        type:"proveedor"
    },process.env.JWT_SECRET as Secret,{
        expiresIn:"1h"
    })
}
export const verifyToken:VerifyToken=(token)=>{
    try{
        const data=jwt.verify(token,process.env.JWT_SECRET as Secret) as DataToken;
        return data
    }catch(err){
        return null
    }
}