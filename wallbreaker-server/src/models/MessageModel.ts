import { InferSchemaType, Schema, Types, model } from 'mongoose'

export interface Message {
    _id: Types.ObjectId
    conversationId: Types.ObjectId
    senderId: Types.ObjectId
    timeCreated: Date
    text: string
    attachmentId: Types.ObjectId
}

const MessageSchema = new Schema<Message>({
    conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    timeCreated: { type: Date, required: true },
    text: { type: String, required: true },
    attachmentId: { type: Schema.Types.ObjectId, ref: 'Attachment', required: false },
})

export default model('Message', MessageSchema)