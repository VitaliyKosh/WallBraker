import { Schema, Types, model } from 'mongoose'

export interface Participant {
    _id: Types.ObjectId
    conversationId: Types.ObjectId
    userId: Types.ObjectId
    writing: boolean
}

const ParticipantSchema = new Schema<Participant>({
    conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    writing: { type: Boolean, default: false, required: true },
})

export default model('Participant', ParticipantSchema)