import { Theme } from './ThemeContext'

const themeColor = document.querySelector('meta[name="theme-color"]')
const backgroundColor = document.querySelector('meta[name="background_color"]')

export default function changeThemeColorMeta(newTheme: Theme) {
    const color = newTheme === Theme.LIGHT ? '#923434' : '#363636'
    const colorBG = newTheme === Theme.LIGHT ? '#ffffff' : '#363636'

    themeColor.setAttribute('content', color)
    backgroundColor.setAttribute('content', colorBG)
}
