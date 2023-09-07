"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const MessageController_1 = __importDefault(require("../controllers/MessageController"));
dotenv_1.default.config();
exports.default = (router, prefix, middlewares) => {
    // router.post(`/${prefix}`, ...middlewares, MessageController.send)
    router.get(`/${prefix}/getConversation/:id`, ...middlewares, MessageController_1.default.getConversation);
};
