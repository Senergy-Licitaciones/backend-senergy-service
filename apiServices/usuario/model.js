const mongoose=require("mongoose");
const usuarioSchema=new mongoose.Schema({
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
    estado:{
        type:["online","offline","toConfirm"],
        trim:true,
        default:"toConfirm"
    },
    role:{
        type:["basico","premium"],
        trim:true,
        default:"basico"
    }
},{
    versionKey:false,
    timestamps:true
});

module.exports=mongoose.model("UsuarioModel",usuarioSchema);