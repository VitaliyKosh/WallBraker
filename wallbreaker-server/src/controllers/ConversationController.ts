import ConversationService from "../services/ConversationService"
import { NextFunction, Request, Response } from 'express';
import UserService from "../services/UserService";

export class ConversationController {
    static async getAllConversations (req: Request, res: Response, next: NextFunction) {
        try {
            const userId = await res.locals.user.id

            let conversations = await ConversationService.getAllConversations(userId)   

            const conversationsDto = conversations

            return res.json({
                conversations: conversationsDto
            })
        } catch (e) {
            next(e)
        }
    }

    static async getConversation (req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const conversation = await ConversationService.getConversation(id)   

            return res.json(conversation)
        } catch (e) {
            next(e)
        }
    }

    static async getParticipants (req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const participants = await ConversationService.getParticipants(id)   

            return res.json({ participants })
        } catch (e) {
            next(e)
        }
    }

    static async getUserConversation (req: Request, res: Response, next: NextFunction) {
        try {
            const selfId = await res.locals.user.id
            const { id: userId } = req.params

            const conversation = await ConversationService.getUserConversation(selfId, userId)   

            return res.json({ conversation })
        } catch (e) {
            next(e)
        }
    }

    static async getFirstConversation (req: Request, res: Response, next: NextFunction) {
        try {
            const selfId = await res.locals.user.id

            const conversation = await ConversationService.getFirstConversation(selfId)   

            return res.json({ conversation })
        } catch (e) {
            next(e)
        }
    }
}