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
const MessageModel_1 = __importDefault(require("../models/MessageModel"));
const MessageDto_1 = __importDefault(require("../dtos/MessageDto"));
dotenv_1.default.config();
class MessageService {
    static send(conversationId, senderId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield MessageModel_1.default.create({
                    conversationId,
                    senderId,
                    timeCreated: Date.now(),
                    text
                });
                const messageDto = new MessageDto_1.default(message);
                return messageDto;
            }
            catch (e) {
                console.log(e);
                return {};
            }
        });
    }
    static getConversation(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield MessageModel_1.default.find({ conversationId }).sort([['timeCreated', -1]]);
                const messageDtos = messages.map(m => new MessageDto_1.default(m));
                return messageDtos;
            }
            catch (e) {
                console.log(e);
                return [];
            }
        });
    }
}
exports.default = MessageService;
