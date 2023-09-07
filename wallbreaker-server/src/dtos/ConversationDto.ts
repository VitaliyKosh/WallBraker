import { Conversation } from "../models/ConversationModel"
import { User } from "../models/UserModel"

export default class ConversationDto {
    name: string
    id: string

    constructor(model: Conversation) {
        this.name = model.name
        this.id = model._id.toString()
    }
}