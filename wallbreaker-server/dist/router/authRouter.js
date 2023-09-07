"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
// import { body } from 'express-validator'
exports.default = (router, prefix, middlewares) => {
    router.post(`/${prefix}/registration`, ...middlewares, AuthController_1.default.registration);
    router.get(`/${prefix}/activate/:link`, ...middlewares, AuthController_1.default.activate);
    router.post(`/${prefix}/login`, ...middlewares, AuthController_1.default.login);
    router.post(`/${prefix}/logout`, [...middlewares, authMiddleware_1.default], AuthController_1.default.logout);
    router.get(`/${prefix}/refresh`, ...middlewares, AuthController_1.default.refresh);
    router.post(`/${prefix}/resetPassword`, ...middlewares, AuthController_1.default.resetPasswordRequest);
    router.post(`/${prefix}/resetPassword/:link`, ...middlewares, AuthController_1.default.resetPassword);
};
