import { useEffect, useState } from 'react'

export enum ErrorTypes {
    NONE = 'NONE',
    ANY = 'ANY',
    DIFF_PASS = 'DIFF_PASS'
}

const errorMessages: Record<ErrorTypes, string> = {
    [ErrorTypes.NONE]: '',
    [ErrorTypes.ANY]: '',
    [ErrorTypes.DIFF_PASS]: 'Пароли не совпадают'
}

interface ErrorMessagesArray {
    type: ErrorTypes
    message: string
}

export function useErrors() {
    const [errorText, setErrorText] = useState('')
    const [errorTypes, setErrorTypes] = useState([] as unknown as ErrorMessagesArray[])

    useEffect(() => {
        if (!errorTypes[0]) {
            setErrorText('')
            return
        }
        switch (errorTypes[0].type) {
            case ErrorTypes.DIFF_PASS:
                setErrorText(errorMessages[ErrorTypes.DIFF_PASS]); break
            case ErrorTypes.ANY:
                setErrorText(errorTypes[0].message); break
            default:
                setErrorText(''); break
        }
    }, [errorTypes[0]])

    const addError = (error: ErrorTypes) => {
        if (!errorTypes.find(e => e.type === error)) {
            setErrorTypes(s => [...s, {
                type: error,
                message: errorMessages[error]
            }])
        }
    }

    const removeError = (error: ErrorTypes) => {
        setErrorTypes(s => s.filter(s => s.type !== error))
    }

    return {
        addError,
        removeError,
        errorText,
        setErrorText,
        errorTypes,
        setErrorTypes
    }
}
