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
exports.WSServer = exports.WSMessageEvent = void 0;
const ws_1 = __importDefault(require("ws"));
const TokenService_1 = __importDefault(require("../../services/TokenService"));
const UserService_1 = __importDefault(require("../../services/UserService"));
const ConversationService_1 = __importDefault(require("../../services/ConversationService"));
const MessageService_1 = __importDefault(require("../../services/MessageService"));
var WSMessageEvent;
(function (WSMessageEvent) {
    WSMessageEvent["CONNECTION"] = "connection";
    WSMessageEvent["MESSAGE"] = "message";
})(WSMessageEvent = exports.WSMessageEvent || (exports.WSMessageEvent = {}));
class ExWebSocket extends ws_1.default {
}
class WSServer {
    constructor() {
    }
    listen(port, cb) {
        this.wss = new ws_1.default.Server({
            port: Number(port)
        }, cb);
        this.listenOn();
    }
    listenOn() {
        var _a;
        (_a = this.wss) === null || _a === void 0 ? void 0 : _a.on('connection', (ws) => {
            ws.on('message', (message) => __awaiter(this, void 0, void 0, function* () {
                const jsonMessage = JSON.parse(message.toString());
                const userData = yield TokenService_1.default.validateAccessToken(jsonMessage.token);
                if (!userData)
                    return;
                ws.userId = userData.id;
                jsonMessage.userId = userData.id;
                UserService_1.default.setOnline(userData.id);
                switch (jsonMessage.event) {
                    case WSMessageEvent.CONNECTION:
                        this.broadcastConnection(jsonMessage);
                        break;
                    case WSMessageEvent.MESSAGE:
                        this.broadcastMessage(jsonMessage);
                        break;
                }
            }));
        });
    }
    broadcastConnection(message) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.wss) === null || _a === void 0 ? void 0 : _a.clients.forEach(client => {
                client.send(JSON.stringify(message));
            });
        });
    }
    broadcastMessage(message) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.userId)
                return;
            const messageDto = yield MessageService_1.default.send(message.conversationId, message.userId, message.text);
            console.log(3, messageDto);
            const sendingMessage = Object.assign(Object.assign({}, message), { message: messageDto });
            const userIds = yield ConversationService_1.default.getAllUserConversationParticipants(message.userId);
            (_a = this.wss) === null || _a === void 0 ? void 0 : _a.clients.forEach((client) => {
                if ((userIds === null || userIds === void 0 ? void 0 : userIds.indexOf(client.userId)) !== -1) {
                    client.send(JSON.stringify(sendingMessage));
                }
            });
        });
    }
}
exports.WSServer = WSServer;
