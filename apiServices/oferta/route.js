const express=require("express");
const { getOfertas } = require("./controller");
const router=express.Router();

router.get("/showOfertas",getOfertas);

module.exports=router;