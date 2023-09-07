import { useContext } from 'react'
import { Sign, SignContext } from './SignContext'

interface UseThemeResult {
    setSign: (sign: Sign) => void
    sign: Sign
}

export function useSign(): UseThemeResult {
    const { sign, setSign } = useContext(SignContext)

    return { sign, setSign }
}
