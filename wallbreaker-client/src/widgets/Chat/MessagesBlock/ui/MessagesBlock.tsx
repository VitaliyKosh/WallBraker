import React, { FC, useEffect, useRef } from 'react'
import classes from './MessagesBlock.module.scss'
import { useTypedSelector } from 'shared/store/hooks/useTypedSelector'
import Message from './Message'

interface MessagesBlockProps {
    className?: string
}

const MessagesBlock: FC<MessagesBlockProps> = props => {
    const {
        messages
    } = useTypedSelector(s => s.conversation)

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        console.log(messages)
        // setTimeout(() => {
        //     ref.current.scrollTo(0, ref.current.scrollHeight)
        // }, 100)
    }, [messages])

    return (
        <div
            className={[props.className, classes.messagesBlock].join(' ')}
            ref={ref}
        >
            {messages.map(message => {
                return (
                    <Message
                        key={message.id}
                        message={message}
                    />
                )
            })}
        </div>
    )
}

export default MessagesBlock
