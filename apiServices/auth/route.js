const express=require("express");
const checkAuth = require("../../middlewares/checkAuth");
const checkUserType = require("../../middlewares/checkUserType");
const checkRoleAuth = require("../../middlewares/roleAuth");
const { validateUserLogin, validateUserRegister, validateCode } = require("../../middlewares/validator");
const {logoutProveedor, registerProveedor,confirmProveedorAccount, registerUsuario, loginProveedor,logoutUsuario,confirmAccount, loginUsuario } = require("./controller");
const router=express.Router();
router.put("/loginProveedor",loginProveedor);
router.put("/loginUsuario",validateUserLogin,loginUsuario);
router.put("/logoutUsuario",checkAuth,checkUserType(["user"]),checkRoleAuth(["basico"]),logoutUsuario);
router.put("/logoutProveedor",checkAuth,checkUserType([`proveedor`]),checkRoleAuth([`basico`]),logoutProveedor);
router.post("/registerProveedor",registerProveedor);
router.post("/registerUsuario",validateUserRegister,registerUsuario);
router.put("/confirmAccount",validateCode,confirmAccount);
router.put("/confirmProveedorAccount",confirmProveedorAccount);
module.exports=router;