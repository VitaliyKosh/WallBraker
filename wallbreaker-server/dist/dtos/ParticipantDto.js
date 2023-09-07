"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParticipantDto {
    constructor(model) {
        this.userId = model.userId.toString(),
            this.conversationId = model.conversationId.toString();
    }
}
exports.default = ParticipantDto;
