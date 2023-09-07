"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    conversationId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Conversation', required: true },
    senderId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    timeCreated: { type: Date, required: true },
    text: { type: String, required: true },
    attachmentId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Attachment', required: false },
});
exports.default = (0, mongoose_1.model)('Message', MessageSchema);
