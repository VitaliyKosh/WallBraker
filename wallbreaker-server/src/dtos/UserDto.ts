import { User } from "../models/UserModel"

export default class UserDto {
    email: string
    id: string
    accountType: string
    cash: number
    username?: string
    isActivated: boolean

    constructor(model: User) {
        this.email = model.email
        this.id = model._id.toString()
        this.accountType = model.accountType
        this.cash = model.cash
        this.username = model.username
        this.isActivated = model.isActivated
    }
}