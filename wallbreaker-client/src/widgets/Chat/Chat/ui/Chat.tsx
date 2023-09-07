import React, { FC } from 'react'
import classes from './Chat.module.scss'

interface ChatProps {
    className?: string
    user?: string
}

const Chat: FC<ChatProps> = props => {
    return (
        <div className={[props.className, classes.chat].join(' ')}>
            
        </div>
    )
}

export default Chat
