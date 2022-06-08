"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkAuth_1 = __importDefault(require("../../middlewares/checkAuth"));
const checkUserType_1 = __importDefault(require("../../middlewares/checkUserType"));
const roleAuth_1 = __importDefault(require("../../middlewares/roleAuth"));
const enums_1 = require("../../types/data/enums");
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.get("/getBrgs", checkAuth_1.default, (0, checkUserType_1.default)([enums_1.Type.User]), (0, roleAuth_1.default)([enums_1.Role.Basico, enums_1.Role.Premium, enums_1.Role.Admin]), controller_1.getBrg);
router.post("/addBrg", controller_1.addBrg);
exports.default = router;
