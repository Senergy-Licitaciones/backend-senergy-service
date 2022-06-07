import express from "express";
import checkAuth from "../../middlewares/checkAuth";
import checkUserType from "../../middlewares/checkUserType";
import checkRoleAuth from "../../middlewares/roleAuth";
import { Role, Type } from "../../types/data/enums";
import { getBrg, addBrg } from "./controller";

const router=express.Router();

router.get("/getBrgs",checkAuth,checkUserType([Type.User]),checkRoleAuth([Role.Basico,Role.Premium,Role.Admin]),getBrg);
router.post("/addBrg",addBrg);

export default router;