const express=require("express");
const checkAuth = require("../../middlewares/checkAuth");
const checkUserType = require("../../middlewares/checkUserType");
const checkRoleAuth = require("../../middlewares/roleAuth");
const router=express.Router();
const {getServicios,addServicio}=require("./controller");
router.get("/getServicios",checkAuth,checkUserType(["user"]),checkRoleAuth(["basico","premium","admin"]),getServicios);
router.post("/addServicio",addServicio);

module.exports=router;