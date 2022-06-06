import mongoose from "mongoose";
const codeSchema=new mongoose.Schema({
    code:{
        type:String,
        length:6,
        unique:true,
        required:true
    },
    expiredTime:{
        type:Date,
        expires:300
    },
    user:{
        type:String,
        trim:true,
        required:true,
        unique:true
    }
},{
    versionKey:false,
    timestamps:true
});
export default mongoose.model("CodeModel",codeSchema);