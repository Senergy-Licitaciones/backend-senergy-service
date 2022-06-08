import mongoose from "mongoose";

export const connectionDB=async()=>{
    try{
        const URL_DB=process.env.URL_DB as string ;
        await mongoose.connect(URL_DB);
        console.log("Conectado a la DB");
    }catch(err){
        console.log("Ha ocurrido un error al conectarse a la DB ",err);
    }
}