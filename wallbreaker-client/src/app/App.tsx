/* eslint-disable max-len */
import { type FC, Suspense } from 'react'
import './styles/index.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTheme } from 'app/providers/ThemeProvider'
import { PageLoader } from 'widgets/PageLoader'
import { AppRouter } from './providers/AppRouter'
import { Navbar } from 'widgets/Navbar'
import { Header } from 'widgets/Header'

const pendingUpdate = false

// function viewportHandler() {
//     window.scrollTo(100, 0)

//     if (pendingUpdate) return
//     pendingUpdate = true

//     requestAnimationFrame(() => {
//         pendingUpdate = false

//         if (window.visualViewport.offsetTop >= 0) {
//             document.getElementById('keyboard-h').style.height = `calc(100vh - ${Math.max(0, window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop)}px)`
//         }
//     })
// }

// window.visualViewport.addEventListener('scroll', viewportHandler)
// window.visualViewport.addEventListener('resize', viewportHandler)

window.addEventListener('resize', () => {
    // For the rare legacy browsers that don't support it
    if (!window.visualViewport) {
      return
    }

    console.log(window.visualViewport.height)

    // document.getElementById('keyboard-h').style.height = `calc(100svh - ${Math.max(0, window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop)}px)`
})

const App: FC = () => {
    const { theme } = useTheme()

    return (
        <div id="keyboard-h" className={classNames('app', {}, [theme])}>
            <Header />
            <Suspense fallback={<PageLoader />}>
                <AppRouter />
            </Suspense>
            <Navbar />
        </div>
    )
}

export default App
