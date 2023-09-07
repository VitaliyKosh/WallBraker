import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from 'app/App'
import ThemeProvider from 'app/providers/ThemeProvider/ui/ThemeProvider'
import { ErrorBoundary } from 'app/providers/ErrorBoundary'
import registerSW from 'app/serviceWorker/swRegistration'
import { StoreProvider } from 'app/providers/StoreProvider'
import { AuthProvider } from 'app/providers/AuthProvider'
import { WsProvider } from 'app/providers/WsProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))

history.pushState(null, null, location.href)

root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <ErrorBoundary>
            <ThemeProvider>
                <StoreProvider>
                    <WsProvider>
                        <AuthProvider>
                            <App/>
                        </AuthProvider>
                    </WsProvider>
                </StoreProvider>
            </ThemeProvider>
        </ErrorBoundary>
    </BrowserRouter>
    // </React.StrictMode>
)

registerSW()
