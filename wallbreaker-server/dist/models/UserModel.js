"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String },
    registrationDate: { type: Date, required: true },
    isActivated: { type: Boolean, default: false, required: true },
    accountType: { type: String, required: true },
    cash: { type: Number, required: true, default: 0 },
    lastKeyDeleted: { type: Date, required: true },
    lastOnline: { type: Date, required: true },
});
exports.default = (0, mongoose_1.model)('User', UserSchema);
