/* eslint-disable i18next/no-literal-string */
import { FC, useEffect, useState } from 'react'
import Button from 'shared/ui/Button/Button'

interface BugButtonProps {
    className?: string
    children?: React.ReactNode
}

export const BugButton: FC<BugButtonProps> = props => {
    const { className, children, ...otherProps } = props

    const [error, setError] = useState(false)

    const throwError = () => {
        setError(true)
    }

    useEffect(() => {
        if (error) {
            throw new Error()
        }
    }, [error])

    return (
        <Button
            onClick={throwError}
            {...otherProps}
        >
            {'Throw Error'}
        </Button>
    )
}
