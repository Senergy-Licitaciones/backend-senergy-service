const express=require("express");
const checkAuth = require("../../middlewares/checkAuth");
const checkUserType = require("../../middlewares/checkUserType");
const { upload } = require("../../middlewares/filesLicitacion/uploadFile");
const checkRoleAuth = require("../../middlewares/roleAuth");
const { showLicitaciones,getTipos, createLicitacion, updateLicitacion,findFilename,showFile } = require("./controller");
const router=express.Router();

router.get("/licitaciones",checkAuth,checkUserType(["proveedor"]),checkRoleAuth(["basico","premium"]),showLicitaciones);
router.post("/crearLicitacion",checkAuth,checkUserType(["user"]),checkRoleAuth(["basico","premium"]),createLicitacion);
router.put("/actualizarLicitacion",updateLicitacion);
router.get("/tipoLicitaciones",checkAuth,checkUserType(["user"]),checkRoleAuth(["basico","premium"]),getTipos);
router.get("/file/:filename",showFile);
router.param("filename",findFilename);
module.exports=router;