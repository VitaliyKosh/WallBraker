import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import AdminUserService from '../services/AdminUserService';
dotenv.config();


export default class AdminUserController {
    static async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {       
            const userId = await res.locals.user.id

            let users = await AdminUserService.getAllUsers()    

            users = users.filter(u => u.id !== userId)

            return res.json({ users })
        } catch (e) {
            next(e)
        }
    }

    static async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {       
            const { id } = req.params

            await AdminUserService.deleteUser(id)

            return res.json(id)
        } catch (e) {
            next(e)
        }
    }
}