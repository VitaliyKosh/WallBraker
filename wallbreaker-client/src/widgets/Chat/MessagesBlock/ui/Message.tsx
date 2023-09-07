import React, { FC } from 'react'
import classes from './Message.module.scss'
import { Message as MessageType } from 'shared/types/conversation'
import { useTypedSelector } from 'shared/store/hooks/useTypedSelector'

interface MessageProps {
    className?: string
    message: MessageType
}

const Message: FC<MessageProps> = props => {
    const { user } = useTypedSelector(s => s.user)
    const date = new Date(props.message.timeCreated)

    const self = props.message.senderId === user.id

    const getDateString = (date: Date): string => {
        const minutes = date.getMinutes().toString()
        const hours = date.getHours().toString()

        const mString = minutes.length < 2 ? '0' + minutes : minutes
        const hString = hours.length < 2 ? '0' + hours : hours

        return `${hString}:${mString}`
    }

    return (
        <div
            className={[
                props.className,
                classes.message,
                self ? classes.self : ''
            ].join(' ')}
        >
            <div className={classes.textBox}>
                <span className={classes.text}>
                    {props.message.text}
                </span>
                <span className={classes.timeHide}>
                    {getDateString(date)}
                </span>
            </div>
            <div className={classes.time}>
                {getDateString(date)}
            </div>
        </div>
    )
}

export default Message
