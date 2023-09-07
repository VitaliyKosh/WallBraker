import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/ApiError';
import UserModel from "../models/UserModel";
import AccountTypes from '../types/AccountTypes';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = await res.locals.user.id

        const user = await UserModel.findById(userId)

        if (!user) {
            return next(ApiError.BadRequest('Пользователь не найден'))
        }

        if (user.accountType !== AccountTypes.ADMIN && user.accountType !== AccountTypes.MAIN_ADMIN) {
            return next(ApiError.BadRequest('Отказано в доступе'))
        }

        next()
    } catch (e) {
        return next(ApiError.BadRequest('Отказано в доступе'))
    }
}