import { Response } from "express"

export const httpError=(res:Response,error:Error)=>{
    return res.status(500).send({
        message:"Ha ocurrido un error",
        error
    })
}
export const handleError=(error:Error,message:string)=>{
    return{
        error,
        message
    }
}