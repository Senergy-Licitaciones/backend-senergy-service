const mongoose=require("mongoose");
const codeProveedorSchema=new mongoose.Schema({
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
        default:Date.now(),
        expires:300
    }
},{
    versionKey:false,
    timestamps:true
});
module.exports=mongoose.model("CodeProveedorModel",codeProveedorSchema);