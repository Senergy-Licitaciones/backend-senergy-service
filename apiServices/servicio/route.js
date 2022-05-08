const express=require("express");
const route=express.Router();
const {getServicios}=require("./controller");
route.get("/getServicios",getServicios);

module.exports=route;