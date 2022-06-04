const mongoose=require("mongoose");
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
        default: new Date(new Date().valueOf() + 3600000),
        expires:120
    }
},{
    versionKey:false,
    timestamps:true
});
module.exports=mongoose.model("SessionProveedorModel",sessionProveedorSchema);