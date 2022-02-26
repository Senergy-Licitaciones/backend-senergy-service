const mongoose=require("mongoose");
const usuarioSchema=new mongoose.Schema({
    correo:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    nombre:{
        type:String,
        trim:true
    },
    descripcion:{
        type:String,
        trim:true
    },
    razSocial:{
        type:String,
        trim:true
    },
    estado:{
        type:String,
        trim:true
    }
},{
    versionKey:false,
    timestamps:true
});

module.exports=mongoose.model("UsuarioModel",usuarioSchema);