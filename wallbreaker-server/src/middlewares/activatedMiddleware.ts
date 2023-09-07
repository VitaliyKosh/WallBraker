import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/ApiError';
import UserModel from "../models/UserModel";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = await res.locals.user.id

        const user = await UserModel.findById(userId)

        if (user && !user.isActivated) {
            return next(ApiError.BadRequest('Пользователь не подтвержден'))
        }

        next()
    } catch (e) {
        return next(ApiError.BadRequest('Пользователь не подтвержден'))
    }
}