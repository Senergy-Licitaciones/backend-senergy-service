const express=require("express");
const route=express.Router();
const {getPuntoSum}=require("./controller");
route.get("/getPuntoSum",getPuntoSum);

module.exports=route;