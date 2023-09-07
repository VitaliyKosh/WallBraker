import { Schema, Types, model } from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

export interface Token {
    _id: Types.ObjectId
    userId: Types.ObjectId
    refreshToken: string
    createdAt: Date
}

const TokenSchema = new Schema<Token>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    refreshToken: { type: String, required: true },
    createdAt: { type: Date, expires: '30d', default: Date.now }
})

export default model('Token', TokenSchema)