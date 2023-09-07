import React, { FC } from 'react'
import classes from './ViewPage.module.scss'
import MenuSwitcher from 'shared/ui/Menu/MenuSwitcher/MenuSwitcher'
import { Theme, useTheme } from 'app/providers/ThemeProvider'

interface ViewPageProps {
    className?: string
}

const ViewPage: FC<ViewPageProps> = props => {
    const { theme, toggleTheme } = useTheme()

    const toggleThemeHandler = (f: (value: boolean) => boolean): void => {
        const newValue = f(theme === Theme.DARK)
        if (newValue !== (theme === Theme.DARK)) {
            toggleTheme()
        }
    }

    return (
        <div className={[props.className, classes.viewPage].join(' ')}>
            <MenuSwitcher
                text={'Темная тема'}
                value={theme === Theme.DARK}
                setValue={toggleThemeHandler}
            />
        </div>
    )
}

export default ViewPage
