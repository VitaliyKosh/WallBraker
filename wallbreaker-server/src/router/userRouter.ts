import { Express } from 'express'
import UserController from '../controllers/UserController'
import { IMiddleware } from '.'

export default (router: Express, prefix: string, middlewares: IMiddleware[]) => {
    router.post(`/${prefix}/username`, ...middlewares, UserController.setUsername)
}