const express=require("express");
const checkAuth = require("../../middlewares/checkAuth");
const checkUserType = require("../../middlewares/checkUserType");
const checkRoleAuth = require("../../middlewares/roleAuth");
const { getOfertas,updateOferta, getOfertaById,ofertaId } = require("./controller");
const router=express.Router();

router.get("/showOfertas",checkAuth,checkUserType(["proveedor"]),checkRoleAuth(["basico","premium","admin"]),getOfertas);
router.get("/ofertaById/:id",checkAuth,checkUserType(["proveedor"]),checkRoleAuth(["basico","premium","admin"]),getOfertaById);
router.put("/editOferta/:id",checkAuth,checkUserType(["proveedor"]),checkRoleAuth(["basico","premium","admin"]),updateOferta)
router.param("id",ofertaId);

module.exports=router;