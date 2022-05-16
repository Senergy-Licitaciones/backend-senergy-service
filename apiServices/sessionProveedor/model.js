const mongoose=require("mongoose");
const {ObjectId} =mongoose.Schema;
const sessionProveedorSchema=new mongoose.Schema({
    type:{
        type:String,
        enum:["proveedor"],
        default:"proveedor",
        required:true
    },
    user:{
        type:ObjectId,
        ref:"ProveedorModel",
        trim:true,
        required:true
    },
    expiredAt:{
        type:Date,
        expires:3600,
        default:Date.now()
    }
},{
    versionKey:false,
    timestamps:true
});
module.exports=mongoose.model("SessionProveedorModel",sessionProveedorSchema);