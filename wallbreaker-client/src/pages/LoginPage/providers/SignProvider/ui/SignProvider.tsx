import { FC, PropsWithChildren, useMemo, useState } from 'react'
import { Sign, SignContext } from '../lib/SignContext'

const defaultSign = Sign.LOGIN

const SignProvider: FC<PropsWithChildren> = ({ children }) => {
    const [sign, setSign] = useState<Sign>(defaultSign)

    const defaultProps = useMemo(() => ({
        sign,
        setSign
    }), [sign])

    return (
        <SignContext.Provider value={defaultProps}>
            {children}
        </SignContext.Provider>
    )
}

export default SignProvider
