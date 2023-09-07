import { NextFunction, Request, Response } from 'express';
import { validationResult } from "express-validator"
import ApiError from "../exceptions/ApiError"
import AuthService from "../services/AuthService"
import dotenv from 'dotenv';
import ResetPassService from '../services/ResetPassService';
import UserModel from '../models/UserModel';
dotenv.config();


export default class AuthController {
    static async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, pass } = req.body

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                if (!email) {
                    return next(ApiError.BadRequest(`Пустой E-mail`, errors.array() as never[]))
                } else {
                    return next(ApiError.BadRequest(`Некорректный E-mail`, errors.array() as never[]))
                }
            }

            const user = await AuthService.registration(email, pass)

            const userData = await AuthService.login(email, pass)

            res.cookie('refreshToken', userData.refreshToken, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), secure: false })

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    static async activate(req: Request, res: Response, next: NextFunction) {
        try {
            if (!process.env.CLIENT_URL) throw next(ApiError.ServerError(`Ошибка сервера`))
            
            const activationLink = req.params.link
            await AuthService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const userData = await AuthService.login(email, password)

            res.cookie('refreshToken', userData.refreshToken, { httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), secure: false })
            
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies        
            const token = await AuthService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    static async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            
            const userData = await AuthService.refresh(refreshToken)
            
            res.cookie('refreshToken', userData.refreshToken, {httpOnly: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), secure: false})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    static async resetPasswordRequest(req: Request, res: Response, next: NextFunction) {
        try {       
            const { email } = req.body

            const user = await UserModel.findOne({ email })

            if (!user) {
                return next(ApiError.BadRequest(`Пользователя с таким e-mail не существует`))
            }

            const userId = await AuthService.resetPasswordRequest(email, user._id.toString())

            return res.json(userId)
        } catch (e) {
            next(e)
        }
    }

    static async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            if (!process.env.CLIENT_URL) throw next(ApiError.ServerError(`Ошибка сервера`))
            
            const resetLink = req.params.link
            const { pass } = req.body

            const userId = await ResetPassService.validateLink(resetLink)

            if (!userId) {
                return next(ApiError.BadRequest(`Ссылка недействительна`))
            }

            await AuthService.resetPassword(userId.toString(), pass)
            await ResetPassService.removeLink(resetLink)
            // return res.redirect(`${process.env.CLIENT_URL}/resetPass/${resetLink}`)
            return res.json(userId)
        } catch (e) {
            next(e)
        }
    }
}