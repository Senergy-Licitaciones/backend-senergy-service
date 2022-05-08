const express=require("express");
const route=express.Router();
const {getBrg}=require("./controller");
route.get("/brg",getBrg);

module.exports=route;