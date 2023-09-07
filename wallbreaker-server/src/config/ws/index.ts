import ws, { Server, WebSocket } from 'ws'
import TokenService from '../../services/TokenService'
import UserService from '../../services/UserService'
import { IncomingMessage } from 'http'
import ConversationService from '../../services/ConversationService'
import MessageService from '../../services/MessageService'

export enum WSMessageEvent {
    CONNECTION = 'connection',
    MESSAGE = 'message'
}

export interface WSBaseMessage {
    token: string
    userId?: string
}

export interface WSConnectionMessage extends WSBaseMessage {
    event: WSMessageEvent.CONNECTION
}

export interface WSMessageMessage extends WSBaseMessage {
    event: WSMessageEvent.MESSAGE
    conversationId: string
    text: string
}

export type WSMessage = WSConnectionMessage | WSMessageMessage

class ExWebSocket extends ws {
    userId: string | undefined
}

export class WSServer {
    private wss: ws.Server<typeof ws, typeof IncomingMessage> | undefined

    constructor() {

    }

    listen (port: string | undefined, cb: () => void) {
        this.wss = new ws.Server({
            port: Number(port)
        }, cb)

        this.listenOn()
    }

    private listenOn () {
        this.wss?.on('connection', (ws: ExWebSocket) => {
            ws.on('message', async (message) => {
                const jsonMessage: WSMessage = JSON.parse(message.toString())
                const userData = await TokenService.validateAccessToken(jsonMessage.token)
                
                if (!userData) return

                ws.userId = userData.id
                jsonMessage.userId = userData.id

                UserService.setOnline(userData.id)

                switch (jsonMessage.event) {
                    case WSMessageEvent.CONNECTION:
                        this.broadcastConnection(jsonMessage)
                        break;
                    case WSMessageEvent.MESSAGE:
                        this.broadcastMessage(jsonMessage)
                        break;
                }
            })
        })
    }

    private async broadcastConnection (message: any) {
        this.wss?.clients.forEach(client => {
            client.send(JSON.stringify(message))
        })
    }

    private async broadcastMessage (message: WSMessageMessage) {
        if (!message.userId) return

        const messageDto = await MessageService.send(message.conversationId, message.userId, message.text)

        console.log(3, messageDto);
        

        const sendingMessage = {
            ...message,
            message: messageDto
        }

        const userIds = await ConversationService.getAllUserConversationParticipants(message.userId)

        this.wss?.clients.forEach((client: any) => {
            if (userIds?.indexOf(client.userId) !== -1) {
                client.send(JSON.stringify(sendingMessage))
            }
        })
    }
}