import dotenv from 'dotenv';
import ConversationModel from '../models/ConversationModel';
import ParticipantModel from '../models/ParticipantModel';
import UserService from './UserService';
import ConversationDto from '../dtos/ConversationDto';
import ParticipantUserDto from '../dtos/ParticipantUserDto';
import ApiError from '../exceptions/ApiError';
dotenv.config();

export default class ConversationService {
    static async getAllConversations (userId: string) {
        try {
            const participants = await ParticipantModel.find({ userId })

            const conversationIds = participants.map(p => p.conversationId)

            const conversations = await ConversationModel.find({_id: { $in : conversationIds } })

            const conversationsDto = conversations.map(c => new ConversationDto(c))

            return conversationsDto
        } catch (e) {            
            return null
        }
    }

    static async getConversation (id: string) {
        try {
            const conversation = await ConversationModel.findById(id)

            const conversationDto = conversation ? new ConversationDto(conversation) : null

            return conversationDto
        } catch (e) {            
            return null
        }
    }

    static async getParticipants (id: string) {
        try {
            const conversation = await ParticipantModel.find({ conversationId: id })

            const participants = await Promise.all(conversation.map(async conversation => {
                return await UserService.getUser(conversation.userId.toString())
            }))

            const participantsDto = participants.map(p => p ? new ParticipantUserDto(p) : null).filter(p => p !== null)

            return participantsDto
        } catch (e) {            
            return null
        }
    }

    static async getUserConversation (userId1: string, userId2: string) {
        try {
            const participants1 = await ParticipantModel.find({userId: userId1})
            const participants2 = await ParticipantModel.find({userId: userId2})

            const participant = participants1.find((p1) => {
                return participants2.find(p2 => {
                    return p1.conversationId.toString() === p2.conversationId.toString()
                })
            })
            
            const conversationDto = await (
                participant
                ?
                this.getConversation(participant.conversationId.toString())
                :
                this.newConversation([userId1, userId2])
            )
            
            return conversationDto
        } catch (e) {            
            return null
        }
    }

    static async getFirstConversation (userId: string) {
        const mainAdmin = await UserService.getMainAdmin()
        const mainAdminId = mainAdmin?._id.toString()
        
        if (!mainAdminId) {
            throw ApiError.ServerError('Admin not found')
        }

        const conversationDto = await this.getUserConversation(userId, mainAdminId)
        
        return conversationDto
    }

    static async newConversation (users: string[], name?: string) {
        try {            
            const conversation = await ConversationModel.create({name})

            const participants = await Promise.all(users.map(async user => {
                return await ParticipantModel.create({
                    conversationId: conversation._id,
                    userId: user
                })
            }))

            const conversationDto = new ConversationDto(conversation)

            return conversationDto
        } catch (e) {  
            return null
        }
    }

    static async getAllUserConversationParticipants (userId: string) {
        try {
            const participants = await ParticipantModel.find({ userId })

            const conversationIds = participants.map(p => p.conversationId)

            const allParticipants = await ParticipantModel.find({ conversationId: { $in: conversationIds } })

            const allUsers = await Promise.all(allParticipants.map(async p => {
                return await UserService.getUser(p.userId.toString())
            }))

            const participantsDto = allUsers.map(p => p ? new ParticipantUserDto(p) : null).map(p => p?.id)

            return participantsDto 
        } catch (e) {            
            return null
        }
    }


}