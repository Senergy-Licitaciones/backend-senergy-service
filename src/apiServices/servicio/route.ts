import express from "express";
import checkAuth from "../../middlewares/checkAuth";
import checkUserType from "../../middlewares/checkUserType";
import checkRoleAuth from "../../middlewares/roleAuth";
import { Role, Type } from "../../types/data/enums";
const router=express.Router();
import { getServicios, addServicio } from "./controller";
router.get("/getServicios",checkAuth,checkUserType([Type.User]),checkRoleAuth([Role.Basico,Role.Premium,Role.Admin]),getServicios);
router.post("/addServicio",addServicio);

export default router;