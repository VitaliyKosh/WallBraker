import { Schema, Types, model } from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

export interface ActivationLink {
    _id: Types.ObjectId
    userId: Types.ObjectId
    activationLink: string
}

const ActivationLinkSchema = new Schema<ActivationLink>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activationLink: { type: String, required: true },
})

export default model('ActivationLink', ActivationLinkSchema)