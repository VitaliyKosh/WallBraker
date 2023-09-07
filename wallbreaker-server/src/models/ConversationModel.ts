import { InferSchemaType, Schema, Types, model } from 'mongoose'

export interface Conversation {
    _id: Types.ObjectId
    name: string
}

const ConversationSchema = new Schema<Conversation>({
    name: { type: String, required: false },
})

export default model('Conversation', ConversationSchema)