import { NextFunction, Request, Response } from 'express';
import ApiError from "../exceptions/ApiError"
import TokenService from "../services/TokenService"

export default async function (req: Request, res: Response, next: NextFunction) {    
    try {        
        const authorizationHeader = req.headers.authorization

        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError())
        }

        const accessToken: string = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }

        const userData = await TokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }

        res.locals.user = userData        

        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }    
}