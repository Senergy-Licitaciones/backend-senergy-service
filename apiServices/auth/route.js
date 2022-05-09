const express=require("express");
const { registerProveedor, registerUsuario, loginProveedor,confirmAccount, loginUsuario } = require("./controller");
const router=express.Router();
router.put("/loginProveedor",loginProveedor);
router.put("/loginUsuario",loginUsuario);
router.post("/registerProveedor",registerProveedor);
router.post("/registerUsuario",registerUsuario);
router.put("/confirmAccount",confirmAccount)
module.exports=router;