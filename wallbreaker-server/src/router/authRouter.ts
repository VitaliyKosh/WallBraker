import { Express } from 'express'
import { IMiddleware } from '.'
import authMiddleware from '../middlewares/authMiddleware'
import AuthController from '../controllers/AuthController'
// import { body } from 'express-validator'

export default (router: Express, prefix: string, middlewares: IMiddleware[]) => {
    router.post(`/${prefix}/registration`, ...middlewares, AuthController.registration)
    router.get(`/${prefix}/activate/:link`, ...middlewares, AuthController.activate)
    router.post(`/${prefix}/login`, ...middlewares, AuthController.login)
    router.post(`/${prefix}/logout`, [...middlewares, authMiddleware], AuthController.logout)
    router.get(`/${prefix}/refresh`, ...middlewares, AuthController.refresh)
    router.post(`/${prefix}/resetPassword`, ...middlewares, AuthController.resetPasswordRequest)
    router.post(`/${prefix}/resetPassword/:link`, ...middlewares, AuthController.resetPassword)
}