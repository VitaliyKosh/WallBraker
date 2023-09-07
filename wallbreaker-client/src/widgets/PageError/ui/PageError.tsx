import { FC, PropsWithChildren } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import Button from 'shared/ui/Button/Button'
import cls from './PageError.module.scss'

interface PageErrorProps {
    className?: string
}

export const PageError: FC<PropsWithChildren<PageErrorProps>> = props => {
    const { className, children, ...otherProps } = props

    const reloadPage = (): void => {
        location.reload()
    }

    return (
        <div
            className={classNames(cls.pageError, {}, [className])}
            {...otherProps}
        >
            <p>неизвестная ошибка</p>
            <Button onClick={reloadPage}>
                обновить
            </Button>
        </div>
    )
}
