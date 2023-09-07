import { createContext } from 'react'

export enum Sign {
    LOGIN = 'LOGIN',
    REGISTRATION = 'REGISTRATION',
    FORGET = 'FORGET',
    FORGET_DONE = 'FORGET_DONE'
}

export interface SignContext {
    sign?: Sign
    setSign?: (sign: Sign) => void
}

export const SignContext = createContext<SignContext>({})

export const LOCAL_STORAGE_THEME_KEY = 'theme'
