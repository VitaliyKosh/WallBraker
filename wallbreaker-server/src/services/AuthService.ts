import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import * as uuid from "uuid";
import TokenService from "./TokenService";
import UserDto from "../dtos/UserDto";
import ApiError from "../exceptions/ApiError";
import dotenv from 'dotenv';
import MailService from "./MailService";
import ActivationLinkModel from "../models/ActivationLinkModel";
import AccountTypes from "../types/AccountTypes";
import TokenModel from "../models/TokenModel";
import ResetPassService from "./ResetPassService";
import { NextFunction } from "express";
dotenv.config();

export default class AuthService {
    static async registration(email: string, password: string) {
        const candidate = await UserModel.findOne({email})

        if (candidate) {
            throw ApiError.BadRequest(`Пользователь c почтой ${email} уже зарегистрирован`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const date = Date.now()
        const user = await UserModel.create({
            email,
            password: hashPassword,
            accountType: AccountTypes.USER,
            registrationDate: date,
            isActivated: false,
            lastKeyDeleted: date,
            lastOnline: date
        })

        await ActivationLinkModel.create({
            userId: user._id,
            activationLink
        })

        await AuthService.generateTokensAndDto(user)
        await MailService.sendRegistrationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`)

        return new UserDto(user)
    }

    static async activate(activationLink: string) {
        const activationLinkDoc = await ActivationLinkModel.findOne({ activationLink })

        if (!activationLinkDoc) {
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }

        const user = await UserModel.findById(activationLinkDoc.userId)

        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден')
        }

        user.isActivated = true
        await user.save()
        activationLinkDoc.deleteOne()
    }

    static async login(email: string, password: string) {
        const user = await UserModel.findOne({email})

        if (!user) {
            throw ApiError.BadRequest(`Пользователь c email ${email} не найден`)
        }

        user.lastOnline = new Date()
        user.save()

        const isPassEquals = await bcrypt.compare(password, user.password)

        if (!isPassEquals) {
            throw ApiError.BadRequest(`Неверный пароль`)
        }

        return await AuthService.generateTokensAndDto(user)
    }

    static async logout(refreshToken: string) {
        const token = await TokenService.removeToken(refreshToken)
        return token
    }
    
    static async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }

        const userData = await TokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await TokenService.findToken(refreshToken)        

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }

        const user = await UserModel.findById(userData.id)
        const newTokens = await AuthService.generateTokensAndDto(user)
        const tokenData = await TokenService.removeToken(refreshToken)
        
        return newTokens
    }

    static async generateTokensAndDto(user: any) {
        const userDto = new UserDto(user)
        const tokens = await TokenService.generateTokens({ ...userDto })
        await TokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    static async resetPasswordRequest(email: string, userId: string) {
        const resetLink = await ResetPassService.generateLink(userId)

        await MailService.sendResetPassMail(email, `${process.env.CLIENT_URL}/app/resetPassword/${resetLink}`)

        return userId
    }

    static async resetPassword(userId: string, pass: string) {
        const user = await UserModel.findById(userId)

        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден')
        }

        const hashPassword = await bcrypt.hash(pass, 3)

        user.password = hashPassword

        await user.save()

        return user._id
    }
}