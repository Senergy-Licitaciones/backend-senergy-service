const mongoose=require("mongoose");
const puntoSumSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    }
},{
    versionKey:false,
    timestamps:true
});
module.exports=mongoose.model("PuntoSumModel",puntoSumSchema);