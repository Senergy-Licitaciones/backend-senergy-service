"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller_1 = require("./controller");
router.post("/changeStatus", controller_1.changeStatus);
router.get("/showUsers", controller_1.showUsers);
exports.default = router;
