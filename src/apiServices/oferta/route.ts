import express from "express";
import checkAuth from "../../middlewares/checkAuth";
import checkUserType from "../../middlewares/checkUserType";
import checkRoleAuth from "../../middlewares/roleAuth";
import { Role, Type } from "../../types/data/enums";
import { getOfertas, updateOferta, getOfertaById, ofertaId } from "./controller";
const router=express.Router();

router.get("/showOfertas",checkAuth,checkUserType([Type.Proveedor]),checkRoleAuth([Role.Basico,Role.Premium,Role.Premium]),getOfertas);
router.get("/ofertaById/:id",checkAuth,checkUserType([Type.Proveedor]),checkRoleAuth([Role.Basico,Role.Premium,Role.Premium]),getOfertaById);
router.put("/editOferta/:id",checkAuth,checkUserType([Type.Proveedor]),checkRoleAuth([Role.Basico,Role.Premium,Role.Premium]),updateOferta)
router.param("id",ofertaId);

export default router;