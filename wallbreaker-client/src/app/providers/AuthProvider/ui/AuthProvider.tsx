import { FC, PropsWithChildren, useEffect, useRef } from 'react'
import { useActions } from 'shared/store/hooks/useActions'
import { LocalStorageItems } from 'shared/types/localStorageItems'

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const { checkAuth, setAuthChecked } = useActions()

    function useOnceCall(cb: () => void) {
        const isCalledRef = useRef(false)

        useEffect(() => {
            if (!isCalledRef.current) {
                isCalledRef.current = true
                cb()
            }
        }, [cb])
    }

    useOnceCall(() => {
        const token = localStorage.getItem(LocalStorageItems.TOKEN)

        if (token) {
            checkAuth()
        } else {
            setAuthChecked()
        }
    })

    return (
        <>
            {children}
        </>
    )
}

export default AuthProvider
