"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AdminUserController_1 = __importDefault(require("../controllers/AdminUserController"));
exports.default = (router, prefix, middlewares) => {
    router.get(`/${prefix}/all`, ...middlewares, AdminUserController_1.default.getAllUsers);
    router.delete(`/${prefix}/:id`, ...middlewares, AdminUserController_1.default.deleteUser);
};
