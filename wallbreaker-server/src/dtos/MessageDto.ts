import { Message } from "../models/MessageModel"

export default class MessageDto {
    id: string
    conversationId: string
    senderId: string
    timeCreated: Date
    text: string
    attachmentId?: string

    constructor(model: Message) {
        this.id = model._id.toString()
        this.conversationId = model.conversationId.toString()
        this.senderId = model.senderId.toString()
        this.timeCreated = model.timeCreated
        this.text = model.text
        this.attachmentId = model.attachmentId?.toString()
    }
}