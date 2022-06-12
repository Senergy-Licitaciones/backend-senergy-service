"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enums_1 = require("../../types/data/enums");
const sessionUserSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        enum: enums_1.Type,
        default: enums_1.Type.User,
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
    expireAt: {
        type: Date,
        expires: 3600
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.default = mongoose_1.default.model('SessionUserModel', sessionUserSchema);
