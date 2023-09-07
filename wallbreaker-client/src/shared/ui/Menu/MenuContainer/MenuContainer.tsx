import React, { FC } from 'react'
import classes from './MenuContainer.module.scss'

interface MenuContainerProps {
    className?: string
    children?: React.ReactNode
}

const MenuContainer: FC<MenuContainerProps> = props => {
    return (
        <div className={[props.className, classes.menuContainer].join(' ')}>
            {props.children}
        </div>
    )
}

export default MenuContainer
