import { Express } from 'express'
import { IMiddleware } from '.'
import AdminUserController from '../controllers/AdminUserController'

export default (router: Express, prefix: string, middlewares: IMiddleware[]) => {
    router.get(`/${prefix}/all`, ...middlewares, AdminUserController.getAllUsers)
    router.delete(`/${prefix}/:id`, ...middlewares, AdminUserController.deleteUser)
}