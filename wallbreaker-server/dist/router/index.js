"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("./authRouter"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const activatedMiddleware_1 = __importDefault(require("../middlewares/activatedMiddleware"));
const userRouter_1 = __importDefault(require("./userRouter"));
const onlineMiddleware_1 = __importDefault(require("../middlewares/onlineMiddleware"));
const adminUserRouter_1 = __importDefault(require("./adminUserRouter"));
const adminMiddleware_1 = __importDefault(require("../middlewares/adminMiddleware"));
const conversationRouter_1 = __importDefault(require("./conversationRouter"));
const messagesRouter_1 = __importDefault(require("./messagesRouter"));
const $router = (0, express_1.default)();
const routers = [
    {
        router: authRouter_1.default,
        middlewares: [onlineMiddleware_1.default],
        prefix: 'auth'
    }, {
        router: userRouter_1.default,
        middlewares: [authMiddleware_1.default, activatedMiddleware_1.default, onlineMiddleware_1.default],
        prefix: 'user'
    }, {
        router: adminUserRouter_1.default,
        middlewares: [authMiddleware_1.default, activatedMiddleware_1.default, adminMiddleware_1.default, onlineMiddleware_1.default],
        prefix: 'adminUser'
    }, {
        router: conversationRouter_1.default,
        middlewares: [authMiddleware_1.default, activatedMiddleware_1.default, onlineMiddleware_1.default],
        prefix: 'conversation'
    }, {
        router: messagesRouter_1.default,
        middlewares: [authMiddleware_1.default, activatedMiddleware_1.default, onlineMiddleware_1.default],
        prefix: 'message'
    }
];
routers.forEach(router => router.router($router, router.prefix, router.middlewares || []));
exports.default = $router;
