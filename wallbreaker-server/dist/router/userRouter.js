"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = __importDefault(require("../controllers/UserController"));
exports.default = (router, prefix, middlewares) => {
    router.post(`/${prefix}/username`, ...middlewares, UserController_1.default.setUsername);
};
