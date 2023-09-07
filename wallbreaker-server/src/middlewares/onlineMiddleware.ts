import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/ApiError';
import UserModel from "../models/UserModel";
import TokenService from '../services/TokenService';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization

        const accessToken = authorizationHeader?.split(' ')[1]

        if (!accessToken) {
            return next()
        }

        const userData = await TokenService.validateAccessToken(accessToken)        

        const userId = await userData?.id

        const user = await UserModel.findById(userId)

        if (user) {
            user.lastOnline = new Date()
            user.save()
        }

        next()
    } catch (e) {
        return next(ApiError.BadRequest('Online Error'))
    }
}