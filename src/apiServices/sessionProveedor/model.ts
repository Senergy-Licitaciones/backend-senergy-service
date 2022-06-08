import mongoose from "mongoose";
import { SessionProveedor } from "../../types/data";
import { Type } from "../../types/data/enums";
const sessionProveedorSchema=new mongoose.Schema<SessionProveedor>({
    type:{
        type:String,
        enum:Type,
        default:Type.Proveedor,
        required:true
    },
    jwt:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    proveedor:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    expireAt:{
        type:Date,
        default: new Date(new Date().valueOf() + 3600000),
        expires:120
    }
},{
    versionKey:false,
    timestamps:true
});
export default mongoose.model<SessionProveedor>("SessionProveedorModel",sessionProveedorSchema);