import { NextFunction, Request, Response } from 'express';
import ApiError from "../exceptions/ApiError"

export default (err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors })
    }

    console.log(err);

    return res.status(500).json({ message: 'Ошибка сервера' })
}