import { Role} from "../types/data";
import { CheckRoleAuth } from "../types/methods";

const checkRoleAuth:CheckRoleAuth=(roles)=>async(req,res,next)=>{
    try{
        const proveedor=req.proveedor;
        const user=req.user;
        let arrayInit:Role[]=[]
        if(proveedor)arrayInit.concat(roles).includes(proveedor.role)?(next()):(res.status(409).send({message:"Usuario sin permisos",error:true}));
        if(user)arrayInit.concat(roles).includes(user.role)?(next()):(res.status(409).send({message:"Proveedor sin permisos",error:true}));
        throw new Error("No tiene acceso a este recurso");
    }catch(err){
        return res.status(500).send({
            message:"Ha ocurrido un error en la autenticación",
            error:err
        })
    }
}
export default checkRoleAuth;