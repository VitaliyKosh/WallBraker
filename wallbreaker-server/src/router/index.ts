import Router, { Express, NextFunction, Request, Response } from 'express'
import authRouter from './authRouter'
import authMiddleware from '../middlewares/authMiddleware'
import activatedMiddleware from '../middlewares/activatedMiddleware'
import userRouter from './userRouter'
import onlineMiddleware from '../middlewares/onlineMiddleware'
import adminUserRouter from './adminUserRouter'
import adminMiddleware from '../middlewares/adminMiddleware'
import conversationRouter from './conversationRouter'
import messagesRouter from './messagesRouter'
const $router = Router()

export type IMiddleware = (req: Request, res: Response, next: NextFunction) => void

interface IRouter {
    router: (router: Express, prefix: string, middlewares: IMiddleware[]) => void
    prefix: string
    middlewares?: IMiddleware[]
}

const routers: IRouter[] = [
    {
        router: authRouter,
        middlewares: [onlineMiddleware],
        prefix: 'auth'
    }, {
        router: userRouter,
        middlewares: [authMiddleware, activatedMiddleware, onlineMiddleware],
        prefix: 'user'
    }, {
        router: adminUserRouter,
        middlewares: [authMiddleware, activatedMiddleware, adminMiddleware, onlineMiddleware],
        prefix: 'adminUser'
    }, {
        router: conversationRouter,
        middlewares: [authMiddleware, activatedMiddleware, onlineMiddleware],
        prefix: 'conversation'
    }, {
        router: messagesRouter,
        middlewares: [authMiddleware, activatedMiddleware, onlineMiddleware],
        prefix: 'message'
    }
]

routers.forEach(router => router.router($router, router.prefix, router.middlewares || []))

export default $router