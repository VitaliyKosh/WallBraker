import React, { FC } from 'react'
import classes from './MenuSwitcher.module.scss'
import MenuItem from '../MenuItem/MenuItem'

interface MenuSwitcherProps {
    className?: string
    text: string
    value: boolean
    setValue: (f: (value: boolean) => boolean) => void
}

const MenuSwitcher: FC<MenuSwitcherProps> = props => {
    const toggle = () => {
        props.setValue((value) => !value)
    }

    return (
        <MenuItem
            className={[props.className, classes.menuSwitcher].join(' ')}
            onClick={toggle}
        >
            {props.text}
            <div
                className={
                    [
                        classes.switcherBox,
                        props.value ? classes.enabled : classes.disable
                    ].join(' ')
                }
            >
                <div className={
                    [
                        classes.switcher,
                        props.value ? classes.enabled : classes.disable
                    ].join(' ')
                }
                />
            </div>
        </MenuItem>
    )
}

export default MenuSwitcher
