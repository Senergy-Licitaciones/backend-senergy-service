const express=require("express");
const checkAuth = require("../../middlewares/checkAuth");
const checkUserType = require("../../middlewares/checkUserType");
const checkRoleAuth = require("../../middlewares/roleAuth");
const router=express.Router();
const {getBrg, addBrg}=require("./controller");
router.get("/brg",checkAuth,checkUserType(["user"]),checkRoleAuth(["basico","premium"]),getBrg);
router.post("/addBrg",addBrg);
module.exports=router;