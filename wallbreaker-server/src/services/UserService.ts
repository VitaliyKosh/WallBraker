import UserModel from "../models/UserModel";
import dotenv from 'dotenv';
import AccountTypes from "../types/AccountTypes";
dotenv.config();

export default class UserService {
    static async setUsername(userId: string, username: string) {
        const user = await UserModel.findById(userId)

        if (user) {
            user.username = username
            user.save()
        }

        return username
    }

    static async getUser (userId: string) {
        return await UserModel.findById(userId)
    }

    static async setOnline (userId: string) {
        const user = await UserModel.findById(userId)
        if (user) {
            user.lastOnline = new Date() 
            user?.save()
        }
    }

    static async isAdmin (userId: string) {
        const accountType = (await UserModel.findById(userId))?.accountType
        return accountType === AccountTypes.ADMIN || accountType === AccountTypes.MAIN_ADMIN
    }

    static async getAllUsers () {
        return await UserModel.find({ accountType: AccountTypes.USER })
    }

    static async getMainAdmin () {
        return await UserModel.findOne({ accountType: AccountTypes.MAIN_ADMIN })
    }
}