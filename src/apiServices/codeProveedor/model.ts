import mongoose from "mongoose";
import { CodeProveedor } from "../../types/data";
const codeProveedorSchema=new mongoose.Schema<CodeProveedor>({
    code:{
        type:String,
        length:6,
        required:true,
        trim:true,
        unique:true
    },
    proveedor:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    expiredTime:{
        type:Date,
        expires:300
    }
},{
    versionKey:false,
    timestamps:true
});
export default mongoose.model<CodeProveedor>("CodeProveedorModel",codeProveedorSchema);