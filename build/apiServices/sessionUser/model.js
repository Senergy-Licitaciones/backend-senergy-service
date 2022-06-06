"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sessionUserSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        enum: ["user"],
        default: "user",
        required: true
    },
    jwt: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    user: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    expiredTime: {
        type: Date,
        expires: 3600
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.default = mongoose_1.default.model("SessionUserModel", sessionUserSchema);
