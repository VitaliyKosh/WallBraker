import { User } from './../models/UserModel';
import jwt from 'jsonwebtoken'
import TokenModel from '../models/TokenModel'
import dotenv from 'dotenv';
dotenv.config();

declare module 'jsonwebtoken' {
    export interface UserIDJwtPayload extends jwt.JwtPayload {
        email: string
        id: string
    }
}

export default class TokenService {
    static JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'secret'
    static JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'secret'

    static async generateTokens(payload: object) {

        const accessToken = jwt.sign(payload, TokenService.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES })
        const refreshToken = jwt.sign(payload, TokenService.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES })

        return {
            accessToken,
            refreshToken
        }
    }

    static async validateAccessToken(token: string) {
        try {            
            const userData = <jwt.UserIDJwtPayload>jwt.verify(token, TokenService.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    static async validateRefreshToken(token: string) {
        try {
            const userData = <jwt.UserIDJwtPayload>jwt.verify(token, TokenService.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    static async saveToken(userId: string, refreshToken: string) {
        const token = await TokenModel.create({ userId, refreshToken })
        return token
    }

    static async removeToken(refreshToken: string) {
        const tokenData = await TokenModel.deleteOne({refreshToken})
        return tokenData
    }

    static async findToken(refreshToken: string) {
        const tokenData = await TokenModel.findOne({refreshToken})
        return tokenData
    }
}