import { User } from "../models/UserModel"

export default class ParticipantUserDto {
    email: string
    id: string
    accountType: string
    username?: string

    constructor(model: User) {
        this.email = model.email
        this.id = model._id.toString()
        this.accountType = model.accountType
        this.username = model.username
    }
}