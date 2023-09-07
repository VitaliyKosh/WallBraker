import { Schema, Types, model } from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

export interface ResetPass {
    _id: Types.ObjectId
    userId: Types.ObjectId
    link: string
    createdAt: Date
}

const ResetPassSchema = new Schema<ResetPass>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    link: { type: String, required: true },
    createdAt: { type: Date, expires: '30m', default: Date.now }
})

export default model('ResetPass', ResetPassSchema)