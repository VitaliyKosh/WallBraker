import { NextFunction, Request, Response } from 'express';
import UserService from "../services/UserService"
import dotenv from 'dotenv';
dotenv.config();


export default class UserController {
    static async setUsername(req: Request, res: Response, next: NextFunction) {
        try {
            const { username } = req.body
            const userId = await res.locals.user.id

            await UserService.setUsername(userId, username)

            return res.json(username)
        } catch (e) {
            next(e)
        }
    }

}