import mongoose from "mongoose";
import { SessionUser } from "../../types/data";
import { Type } from "../../types/data/enums";
const sessionUserSchema=new mongoose.Schema<SessionUser>({
    type:{
        type:String,
        enum:Type,
        default:Type.User,
        required:true
    },
    jwt:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    user:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    expireAt:{
        type:Date,
        expires:3600
    }
},{
    versionKey:false,
    timestamps:true
});
export default mongoose.model<SessionUser>("SessionUserModel",sessionUserSchema);