import express from "express";
const router=express.Router();
import { changeStatus, showUsers } from "./controller";
router.post("/changeStatus",changeStatus);
router.get("/showUsers",showUsers);
export default router;