"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParticipantUserDto {
    constructor(model) {
        this.email = model.email;
        this.id = model._id.toString();
        this.accountType = model.accountType;
        this.username = model.username;
    }
}
exports.default = ParticipantUserDto;
