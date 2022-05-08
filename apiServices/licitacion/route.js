const express=require("express");
const { upload } = require("../../middlewares/filesLicitacion/uploadFile");
const { showLicitaciones,getTipos, createLicitacion, updateLicitacion,findFilename,showFile } = require("./controller");
const router=express.Router();

router.get("/licitaciones",showLicitaciones);
router.post("/crearLicitacion",createLicitacion);
router.put("/actualizarLicitacion",updateLicitacion);
router.get("/tipoLicitaciones",getTipos);
router.get("/file/:filename",showFile);
router.param("filename",findFilename);
module.exports=router;