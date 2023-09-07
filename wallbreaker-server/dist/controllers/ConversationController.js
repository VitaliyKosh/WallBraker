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
exports.ConversationController = void 0;
const ConversationService_1 = __importDefault(require("../services/ConversationService"));
class ConversationController {
    static getAllConversations(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = yield res.locals.user.id;
                let conversations = yield ConversationService_1.default.getAllConversations(userId);
                const conversationsDto = conversations;
                return res.json({
                    conversations: conversationsDto
                });
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
                const conversation = yield ConversationService_1.default.getConversation(id);
                return res.json(conversation);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getParticipants(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const participants = yield ConversationService_1.default.getParticipants(id);
                return res.json({ participants });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getUserConversation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const selfId = yield res.locals.user.id;
                const { id: userId } = req.params;
                const conversation = yield ConversationService_1.default.getUserConversation(selfId, userId);
                return res.json({ conversation });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getFirstConversation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const selfId = yield res.locals.user.id;
                const conversation = yield ConversationService_1.default.getFirstConversation(selfId);
                return res.json({ conversation });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.ConversationController = ConversationController;
