import React, { FC, useEffect, useState } from 'react'
import classes from './MenuConversation.module.scss'
import MenuItem from '../MenuItem/MenuItem'
import { IConversation } from 'shared/types/conversations'
import ConversationService from 'shared/services/ConversationService'
import { useTypedSelector } from 'shared/store/hooks/useTypedSelector'
import { useNavigate } from 'react-router-dom'
import { privateRoutePath } from 'shared/config/routeConfig/routeConfig'

interface MenuConversationProps {
    className?: string
    conversation: IConversation
}

const MenuConversation: FC<MenuConversationProps> = props => {
    const [name, setName] = useState(props.conversation.name)
    const { user } = useTypedSelector(s => s.user)
    const navigate = useNavigate()

    const onClickHandler = async () => {
        navigate(privateRoutePath.CONVERSATION.slice(0, -3) + props.conversation.id)
    }

    useEffect(() => {
        getName()
    }, [])

    const getName = async () => {
        if (!props.conversation.name) {
            const res = await ConversationService.getAllParticipants(props.conversation.id)
            const participants = res.data.participants.filter(p => p.id !== user.id)
            setName(participants.map(p => p.username ?? p.email).join(', '))
        }
    }

    return (
        <MenuItem
            className={[props.className, classes.menuConversation].join(' ')}
            onClick={onClickHandler}
        >
            {name}
        </MenuItem>
    )
}

export default MenuConversation
