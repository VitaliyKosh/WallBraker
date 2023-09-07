import React, { FC } from 'react'
import classes from './MenuAllUsers.module.scss'
import MenuItem from '../MenuItem/MenuItem'
import { useNavigate } from 'react-router-dom'
import { adminRoutePath } from 'shared/config/routeConfig/routeConfig'

interface MenuAllUsersProps {
    className?: string
    children?: React.ReactNode
}

const MenuAllUsers: FC<MenuAllUsersProps> = props => {
    const navigate = useNavigate()

    const onClickHandler = () => {
        navigate(adminRoutePath.ALL_USERS)
    }

    return (
        <MenuItem
            className={[props.className, classes.menuAllUsers].join(' ')}
            onClick={onClickHandler}
        >
            Все пользователи
        </MenuItem>
    )
}

export default MenuAllUsers
