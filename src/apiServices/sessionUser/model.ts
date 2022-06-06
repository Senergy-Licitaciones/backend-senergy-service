import mongoose from "mongoose";
const sessionUserSchema=new mongoose.Schema({
    type:{
        type:String,
        enum:["user"],
        default:"user",
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
    expiredTime:{
        type:Date,
        expires:3600
    }
},{
    versionKey:false,
    timestamps:true
});
export default mongoose.model("SessionUserModel",sessionUserSchema);