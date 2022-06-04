const express=require("express");
const morgan=require("morgan");
const cors=require("cors");
const app= express();

app.use(morgan("dev"));
app.use( express.json() );
app.use(cors());
//routes
app.use("/api/auth",require("./apiServices/auth/route"));
app.use("/api/licitacion",require("./apiServices/licitacion/route"));
app.use("/api/proveedor",require("./apiServices/proveedor/route"));
app.use("/api/user",require("./apiServices/usuario/route"));
app.use("/api/brg",require("./apiServices/brg/route"));
app.use("/api/puntoSum",require("./apiServices/puntoSum/route"));
app.use("/api/servicio",require("./apiServices/servicio/route"));
app.use("/api/oferta",require("./apiServices/oferta/route"));


module.exports=app;