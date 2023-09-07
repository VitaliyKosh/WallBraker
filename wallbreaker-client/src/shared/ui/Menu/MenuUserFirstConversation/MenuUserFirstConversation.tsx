import React, { FC } from 'react'
import classes from './MenuUserFirstConversation.module.scss'
import MenuItem from '../MenuItem/MenuItem'
import ConversationService from 'shared/services/ConversationService'
import { useNavigate } from 'react-router-dom'
import { privateRoutePath } from 'shared/config/routeConfig/routeConfig'
import { AxiosError } from 'axios'

interface MenuUserFirstConversationProps {
    className?: string
}

const MenuUserFirstConversation: FC<MenuUserFirstConversationProps> = props => {
    const navigate = useNavigate()
    const onClickHandler = async () => {
        try {
            const res = await ConversationService.getFirstConversation()
            navigate(privateRoutePath.CONVERSATION.slice(0, -3) + res.data.conversation.id)
        } catch (e) {
            if (e instanceof AxiosError) {
                console.log(e.response.data.message)
            }
        }
    }

    return (
        <MenuItem
            className={[props.className, classes.menuAdminUser].join(' ')}
            onClick={onClickHandler}
        >
            Чат с админом
        </MenuItem>
    )
}

export default MenuUserFirstConversation
