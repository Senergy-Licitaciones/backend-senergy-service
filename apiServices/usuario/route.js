const express=require("express");
const router=express.Router();
const {changeStatus}=require("./controller");
router.post("/changeStatus",changeStatus);

module.exports=router;