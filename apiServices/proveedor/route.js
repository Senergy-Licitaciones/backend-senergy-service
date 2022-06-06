const express=require("express");
const checkAuth = require("../../middlewares/checkAuth");
const checkUserType = require("../../middlewares/checkUserType");
const checkRoleAuth = require("../../middlewares/roleAuth");
const { participarLicitacion,showProveedores } = require("./controller");
const router=express.Router();

router.post("/crearOferta",checkAuth,checkUserType(["proveedor"]),checkRoleAuth(["basico","premium","admin"]),participarLicitacion);
router.get("/showProveedores",showProveedores);
module.exports=router;