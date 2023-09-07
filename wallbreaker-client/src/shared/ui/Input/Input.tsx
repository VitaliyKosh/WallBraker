import React, { FC, InputHTMLAttributes } from 'react'
import classes from './Input.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'

export enum ThemeInput {
    CLEAR = 'clear',
    DEFAULT = 'default'
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    theme?: ThemeInput
}

const Input: FC<InputProps> = props => {
    const {
        className,
        children,
        theme,
        ...otherProps
    } = props

    return (
        <input
            className={classNames(classes.input, {}, [classes[theme], className])}
            {...otherProps}
        />
    )
}

export default Input
