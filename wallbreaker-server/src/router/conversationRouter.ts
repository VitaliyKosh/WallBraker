import { Express } from 'express'
import { IMiddleware } from '.'
import { ConversationController } from '../controllers/ConversationController'

export default (router: Express, prefix: string, middlewares: IMiddleware[]) => {
    router.get(`/${prefix}/all`, ...middlewares, ConversationController.getAllConversations)
    router.get(`/${prefix}/first`, ...middlewares, ConversationController.getFirstConversation)
    router.get(`/${prefix}/:id`, ...middlewares, ConversationController.getConversation)
    router.get(`/${prefix}/:id/getParticipants/`, ...middlewares, ConversationController.getParticipants)
    router.get(`/${prefix}/byUserId/:id`, ...middlewares, ConversationController.getUserConversation)
}