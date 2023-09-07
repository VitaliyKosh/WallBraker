import { Message } from 'shared/types/conversation'
import { LocalStorageItems } from 'shared/types/localStorageItems'

export const WS_URL = 'ws://localhost:5011'

export enum WSMessageEvent {
    CONNECTION = 'connection',
    MESSAGE = 'message'
}

export interface WSBaseMessage {
    event: WSMessageEvent
    token: string
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

export interface IncomingBaseMessage {
    event: WSMessageEvent
}

export interface IncomingConnectionMessage extends IncomingBaseMessage {
    event: WSMessageEvent.CONNECTION
}

export interface IncomingMessageMessage extends IncomingBaseMessage {
    event: WSMessageEvent.MESSAGE
    message: Message
}

export type WSIncomingMessage = IncomingConnectionMessage | IncomingMessageMessage

export class WS {
    ws: WebSocket

    private onMessageCb: (message: IncomingMessageMessage) => void

    setOnMessageCb (cb: (message: IncomingMessageMessage) => void) {
        this.onMessageCb = cb
    }

    constructor () {
        this.ws = new WebSocket(WS_URL)
        this.listen()
    }

    private listen () {
        this.ws.onopen = this.onopen()
        this.ws.onmessage = this.onmessage()
        this.ws.onclose = this.onclose()
        this.ws.onerror = this.onerror()
    }

    private onopen () {
        return () => {
            console.log('ws open')
            const message: WSConnectionMessage = {
                event: WSMessageEvent.CONNECTION,
                token: localStorage.getItem(LocalStorageItems.TOKEN)
            }
            this.send(message)
        }
    }

    private onmessage () {
        return (event: MessageEvent<string>) => {
            const message = JSON.parse(event.data) as WSIncomingMessage
            switch (message.event) {
                case WSMessageEvent.MESSAGE:
                    this.onMessageCb(message)
                    break
            }
        }
    }

    private onclose () {
        return () => {
            console.log('ws close')
            this.ws = new WebSocket(WS_URL)
            this.listen()
        }
    }

    private onerror () {
        return () => {
            console.log('ws error')
        }
    }

    private send (message: WSMessage) {
        this.ws.send(JSON.stringify(message))
    }

    sendMessage (conversationId: string, text: string) {
        const message: WSMessageMessage = {
            event: WSMessageEvent.MESSAGE,
            token: localStorage.getItem(LocalStorageItems.TOKEN),
            text,
            conversationId
        }
        this.send(message)
    }
}
