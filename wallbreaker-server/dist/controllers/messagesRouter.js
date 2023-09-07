"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const MessageService_1 = __importDefault(require("../services/MessageService"));
dotenv_1.default.config();
exports.default = (router, prefix, middlewares) => {
    router.post(`/${prefix}`, ...middlewares, MessageController.send);
    router.get(`/${prefix}/getConversation/:id`, ...middlewares, MessageController.getConversation);
};
class MessageController {
    static send(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { conversationId, senderId, text } = req.body;
                const messageId = yield MessageService_1.default.send(conversationId, senderId, text);
                return res.json(messageId);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getConversation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const messages = yield MessageService_1.default.getConversation(id);
                return res.json(messages);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
