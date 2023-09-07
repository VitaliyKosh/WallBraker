import { FC } from 'react'
import classes from './MenuItem.module.scss'

interface MenuItemProps {
    className?: string
    children: React.ReactNode
    onClick: () => void
}

const MenuItem: FC<MenuItemProps> = props => {
    return (
        <div
            className={[props.className, classes.menuItem].join(' ')}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    )
}

export default MenuItem
