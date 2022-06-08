import mongoose from "mongoose";
import { User } from "../../types/data";
import { Estado, Role } from "../../types/data/enums";
const usuarioSchema=new mongoose.Schema<User>({
    correo:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    empresa:{
        type:String,
        trim:true,
        required:true
    },
    ruc:{
        type:Number,
        trim:true,
        required:true,
        length:11
    },
    phone:{
        type:Number,
        trim:true,
        length:9,
        required:true
    },
    web:{
        type:String,
        trim:true,
        maxlength:64
    },
    address:{
        type:String,
        trim:true,
        maxlength:64
    },
    estado:{
        type:String,
        enum:Estado,
        trim:true,
        default:Estado.ToConfirm
    },
    sessionId:{
        type:String,
        trim:true
    },
    role:{
        type:String,
        enum:Role,
        trim:true,
        default:Role.Basico
    }
},{
    versionKey:false,
    timestamps:true
});

export default mongoose.model<User>("UsuarioModel",usuarioSchema);