const express=require("express");
const { participarLicitacion } = require("./controller");
const router=express.Router();

router.put("/participar",participarLicitacion);

module.exports=router;