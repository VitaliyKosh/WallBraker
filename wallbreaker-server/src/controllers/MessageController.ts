import { NextFunction, Request, Response,  } from 'express';
import MessageService from '../services/MessageService';

export default class MessageController {
    // static async send (req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const { conversationId, senderId, text } = req.body

    //         const messageId = await MessageService.send(conversationId, senderId, text)   

    //         return res.json(messageId)
    //     } catch (e) {
    //         next(e)
    //     }
    // }

    static async getConversation (req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const messages = await MessageService.getConversation(id)   

            return res.json({ messages })
        } catch (e) {
            next(e)
        }
    }
}