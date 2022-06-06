import mongoose from "mongoose";
const brgSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    }
},{
    versionKey:false,
    timestamps:true
});
export default mongoose.model("BrgModel",brgSchema);