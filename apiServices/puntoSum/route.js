const express=require("express");
const checkAuth = require("../../middlewares/checkAuth");
const checkUserType = require("../../middlewares/checkUserType");
const checkRoleAuth = require("../../middlewares/roleAuth");
const router=express.Router();
const {getPuntoSum,addPuntoSum}=require("./controller");
router.get("/getPuntoSums",checkAuth,checkUserType(["user"]),checkRoleAuth(["basico","premium","admin"]),getPuntoSum);
router.post("/addPuntoSum",addPuntoSum);
module.exports=router;