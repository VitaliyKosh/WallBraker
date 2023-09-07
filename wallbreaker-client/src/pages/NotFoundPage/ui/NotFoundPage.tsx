import { FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './NotFoundPage.module.scss'

interface NotFoundPageProps {
    className?: string
    children?: React.ReactNode
}

export const NotFoundPage: FC<NotFoundPageProps> = props => {
    const { className, children, ...otherProps } = props

    return (
        <div
            className={classNames(cls.notFoundPage, {}, [className])}
            {...otherProps}
        >
            Not Found
        </div>
    )
}
