const express=require("express");
const router=express.Router();
const {changeStatus,showUsers}=require("./controller");
router.post("/changeStatus",changeStatus);
router.get("/showUsers",showUsers);
module.exports=router;