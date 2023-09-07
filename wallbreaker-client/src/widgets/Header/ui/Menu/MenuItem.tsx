import React, { FC } from 'react'
import classes from './MenuItem.module.scss'
import { IconProp } from '@fortawesome/fontawesome-svg-core/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface MenuItemProps {
    icon?: IconProp
    text: string
    onClick: () => void
}

const MenuItem: FC<MenuItemProps> = props => {
    return (
        <div
            className={classes.menuItem}
            onClick={props.onClick}
        >
            <div className={classes.icon}>
                {props.icon && <FontAwesomeIcon icon={props.icon} />}
            </div>
            {props.text}
        </div>
    )
}

export default MenuItem
