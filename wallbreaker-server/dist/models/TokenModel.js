"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TokenSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    refreshToken: { type: String, required: true },
    createdAt: { type: Date, expires: '30d', default: Date.now }
});
exports.default = (0, mongoose_1.model)('Token', TokenSchema);