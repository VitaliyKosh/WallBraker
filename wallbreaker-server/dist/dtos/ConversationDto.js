"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConversationDto {
    constructor(model) {
        this.name = model.name;
        this.id = model._id.toString();
    }
}
exports.default = ConversationDto;
