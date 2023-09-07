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
const ConversationModel_1 = __importDefault(require("../models/ConversationModel"));
const ParticipantModel_1 = __importDefault(require("../models/ParticipantModel"));
const UserService_1 = __importDefault(require("./UserService"));
const ConversationDto_1 = __importDefault(require("../dtos/ConversationDto"));
const ParticipantUserDto_1 = __importDefault(require("../dtos/ParticipantUserDto"));
const ApiError_1 = __importDefault(require("../exceptions/ApiError"));
dotenv_1.default.config();
class ConversationService {
    static getAllConversations(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const participants = yield ParticipantModel_1.default.find({ userId });
                const conversationIds = participants.map(p => p.conversationId);
                const conversations = yield ConversationModel_1.default.find({ _id: { $in: conversationIds } });
                const conversationsDto = conversations.map(c => new ConversationDto_1.default(c));
                return conversationsDto;
            }
            catch (e) {
                return null;
            }
        });
    }
    static getConversation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversation = yield ConversationModel_1.default.findById(id);
                const conversationDto = conversation ? new ConversationDto_1.default(conversation) : null;
                return conversationDto;
            }
            catch (e) {
                return null;
            }
        });
    }
    static getParticipants(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversation = yield ParticipantModel_1.default.find({ conversationId: id });
                const participants = yield Promise.all(conversation.map((conversation) => __awaiter(this, void 0, void 0, function* () {
                    return yield UserService_1.default.getUser(conversation.userId.toString());
                })));
                const participantsDto = participants.map(p => p ? new ParticipantUserDto_1.default(p) : null).filter(p => p !== null);
                return participantsDto;
            }
            catch (e) {
                return null;
            }
        });
    }
    static getUserConversation(userId1, userId2) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const participants1 = yield ParticipantModel_1.default.find({ userId: userId1 });
                const participants2 = yield ParticipantModel_1.default.find({ userId: userId2 });
                const participant = participants1.find((p1) => {
                    return participants2.find(p2 => {
                        return p1.conversationId.toString() === p2.conversationId.toString();
                    });
                });
                const conversationDto = yield (participant
                    ?
                        this.getConversation(participant.conversationId.toString())
                    :
                        this.newConversation([userId1, userId2]));
                return conversationDto;
            }
            catch (e) {
                return null;
            }
        });
    }
    static getFirstConversation(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const mainAdmin = yield UserService_1.default.getMainAdmin();
            const mainAdminId = mainAdmin === null || mainAdmin === void 0 ? void 0 : mainAdmin._id.toString();
            if (!mainAdminId) {
                throw ApiError_1.default.ServerError('Admin not found');
            }
            const conversationDto = yield this.getUserConversation(userId, mainAdminId);
            return conversationDto;
        });
    }
    static newConversation(users, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversation = yield ConversationModel_1.default.create({ name });
                const participants = yield Promise.all(users.map((user) => __awaiter(this, void 0, void 0, function* () {
                    return yield ParticipantModel_1.default.create({
                        conversationId: conversation._id,
                        userId: user
                    });
                })));
                const conversationDto = new ConversationDto_1.default(conversation);
                return conversationDto;
            }
            catch (e) {
                return null;
            }
        });
    }
    static getAllUserConversationParticipants(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const participants = yield ParticipantModel_1.default.find({ userId });
                const conversationIds = participants.map(p => p.conversationId);
                const allParticipants = yield ParticipantModel_1.default.find({ conversationId: { $in: conversationIds } });
                const allUsers = yield Promise.all(allParticipants.map((p) => __awaiter(this, void 0, void 0, function* () {
                    return yield UserService_1.default.getUser(p.userId.toString());
                })));
                const participantsDto = allUsers.map(p => p ? new ParticipantUserDto_1.default(p) : null).map(p => p === null || p === void 0 ? void 0 : p.id);
                return participantsDto;
            }
            catch (e) {
                return null;
            }
        });
    }
}
exports.default = ConversationService;
