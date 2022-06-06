import app from "./app";
import { connectionDB } from "./config/connectionDB";
import {config} from "dotenv"
config();
const PORT=process.env.PORT || 4000;

app.listen(PORT,async()=>{
    await connectionDB();
    console.log("Conectado en el puerto ",PORT);
    
})