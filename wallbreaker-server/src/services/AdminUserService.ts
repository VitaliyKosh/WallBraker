import UserModel from "../models/UserModel";
import UserDto from "../dtos/UserDto";
import dotenv from 'dotenv';
import ActivationLinkModel from "../models/ActivationLinkModel";
import TokenModel from "../models/TokenModel";
dotenv.config();

export default class AdminUserService {
    static async getAllUsers() {        
        const users = await UserModel.find()

        const usersDto = users.map((user) => {
            const userDto = new UserDto(user)
            return {...userDto}
        })        
        
        return usersDto
    }

    static async deleteUser(id: string) {
        await UserModel.deleteOne({ _id: id })
        await TokenModel.deleteMany({ userId: id })
        await ActivationLinkModel.deleteOne({ userId: id })
        return
    }
}