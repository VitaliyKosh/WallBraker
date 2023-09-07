import { InferSchemaType, Schema, Types, model } from 'mongoose'
import AccountTypes from '../types/AccountTypes'

export interface User {
    _id: Types.ObjectId
    email: string
    password: string
    username: string
    registrationDate: Date
    isActivated: boolean
    accountType: AccountTypes
    cash: number
    lastKeyDeleted: Date
    lastOnline: Date
}

const UserSchema = new Schema<User>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String },
    registrationDate: { type: Date, required: true },
    isActivated: { type: Boolean, default: false, required: true },
    accountType: { type: String, required: true },
    cash: { type: Number, required: true, default: 0 },
    lastKeyDeleted: { type: Date, required: true },
    lastOnline: { type: Date, required: true },
})

export default model('User', UserSchema)