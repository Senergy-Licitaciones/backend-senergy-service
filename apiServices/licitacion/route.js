const express=require("express");
const { upload } = require("../../middlewares/filesLicitacion/uploadFile");
const { showLicitaciones, createLicitacion, updateLicitacion,findFilename,showFile } = require("./controller");
const router=express.Router();

router.get("/licitaciones",showLicitaciones);
router.post("/crearLicitacion",upload,createLicitacion);
router.put("/actualizarLicitacion",updateLicitacion);
router.get("/file/:filename",showFile);
router.param("filename",findFilename);
module.exports=router;