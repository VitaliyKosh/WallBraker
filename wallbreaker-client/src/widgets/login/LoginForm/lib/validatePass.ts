import { ErrorTypes } from '../hooks/useErrors'

interface IValidatePass {
    errorType: ErrorTypes
    add: boolean
}

export default function validatePass(pass: string, passConfirm: string): IValidatePass {
    if (pass !== passConfirm) {
        return { errorType: ErrorTypes.DIFF_PASS, add: true }
    } else {
        return { errorType: ErrorTypes.DIFF_PASS, add: false }
    }
}
