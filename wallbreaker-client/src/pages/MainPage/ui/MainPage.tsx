import React, { FC, useEffect } from 'react'
import { AccountInfo } from 'widgets/AccountInfo'

interface MainPageProps {
    className?: string
    children?: React.ReactNode
}

const MainPage: FC<MainPageProps> = props => {
    return (
        <div>
            <AccountInfo />
        </div>
    )
}

export default MainPage
