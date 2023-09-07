import { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Loader.module.scss'

interface LoaderProps {
    className?: string
    children?: React.ReactNode
}

export const Loader: FC<LoaderProps> = props => {
    const { className, children, ...otherProps } = props

    return (
        <div
            className={classNames(cls.loader, {}, [className])}
            {...otherProps}
        >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
