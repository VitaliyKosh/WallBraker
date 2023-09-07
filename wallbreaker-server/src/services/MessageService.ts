import dotenv from 'dotenv';
import MessageModel from '../models/MessageModel';
import MessageDto from '../dtos/MessageDto';
dotenv.config();

export default class MessageService {
    static async send (conversationId: string, senderId: string, text: string) {
        try {
            const message = await MessageModel.create({
                conversationId,
                senderId,
                timeCreated: Date.now(),
                text
            })
            
            const messageDto = new MessageDto(message)
            
            return messageDto
        } catch (e) {    
            console.log(e);
            return {}
        }
    }

    static async getConversation (conversationId: string) {
        try {
            const messages = await MessageModel.find({ conversationId }).sort([['timeCreated', -1]])

            const messageDtos = messages.map(m => new MessageDto(m))

            return messageDtos
        } catch (e) {       
            console.log(e);     
            return []
        }
    }
}