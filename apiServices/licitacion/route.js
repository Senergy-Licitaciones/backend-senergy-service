const express=require("express");
const { showLicitaciones, createLicitacion, updateLicitacion } = require("./controller");
const router=express.Router();

router.get("/licitaciones",showLicitaciones);
router.post("/crearLicitacion",createLicitacion);
router.put("/actualizarLicitacion",updateLicitacion);

module.exports=router;