"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessageDto {
    constructor(model) {
        var _a;
        this.id = model._id.toString();
        this.conversationId = model.conversationId.toString();
        this.senderId = model.senderId.toString();
        this.timeCreated = model.timeCreated;
        this.text = model.text;
        this.attachmentId = (_a = model.attachmentId) === null || _a === void 0 ? void 0 : _a.toString();
    }
}
exports.default = MessageDto;
