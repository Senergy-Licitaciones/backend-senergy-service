const mongoose=require("mongoose");
const {ObjectId} =mongoose.Schema;
const sessionProveedorSchema=new mongoose.Schema({
    type:{
        type:String,
        enum:["proveedor"],
        default:"proveedor",
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