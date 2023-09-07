import {
    LOCAL_STORAGE_THEME_KEY
} from './../../pages/LoginPage/providers/SignProvider/lib/SignContext'
import { Theme } from 'app/providers/ThemeProvider'
import changeThemeColorMeta from 'app/providers/ThemeProvider/lib/changeThemeColorMeta'
import { useEffect } from 'react'

export function useLoginStatusMenuColor() {
    useEffect(() => {
        const themeColor = document.querySelector('meta[name="theme-color"]')
        themeColor.setAttribute('content', '#2040AC')

        return () => {
            const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme ||
            Theme.DARK
            changeThemeColorMeta(defaultTheme)
        }
    }, [])
}
