import React, { FC } from 'react'
import classes from './MenuAdminUser.module.scss'
import MenuItem from '../MenuItem/MenuItem'
import { IAdminUser } from 'shared/types/adminUsers'
import ConversationService from 'shared/services/ConversationService'
import { useNavigate } from 'react-router-dom'
import { privateRoutePath } from 'shared/config/routeConfig/routeConfig'

interface MenuAdminUserProps {
    className?: string
    user: IAdminUser
}

const MenuAdminUser: FC<MenuAdminUserProps> = props => {
    const navigate = useNavigate()
    const onClickHandler = async () => {
        const res = await ConversationService.getConversationByUserId(props.user.id)
        navigate(privateRoutePath.CONVERSATION.slice(0, -3) + res.data.conversation.id)
    }

    return (
        <MenuItem
            className={[props.className, classes.menuAdminUser].join(' ')}
            onClick={onClickHandler}
        >
            {props.user.username ?? props.user.email}
        </MenuItem>
    )
}

export default MenuAdminUser
