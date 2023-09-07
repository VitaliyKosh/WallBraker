import { Express } from 'express'
import dotenv from 'dotenv';
import { IMiddleware } from '.'
import MessageController from '../controllers/MessageController';
dotenv.config();

export default (router: Express, prefix: string, middlewares: IMiddleware[]) => {
    // router.post(`/${prefix}`, ...middlewares, MessageController.send)
    router.get(`/${prefix}/getConversation/:id`, ...middlewares, MessageController.getConversation)
}