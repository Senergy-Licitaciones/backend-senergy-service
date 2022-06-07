import express from "express";
import checkAuth from "../../middlewares/checkAuth";
import checkUserType from "../../middlewares/checkUserType";
import checkRoleAuth from "../../middlewares/roleAuth";
import { Role, Type } from "../../types/data/enums";
import { participarLicitacion, showProveedores } from "./controller";
const router=express.Router();

router.post("/crearOferta",checkAuth,checkUserType([Type.Proveedor]),checkRoleAuth([Role.Basico,Role.Premium,Role.Admin]),participarLicitacion);
router.get("/showProveedores",showProveedores);
export default router;