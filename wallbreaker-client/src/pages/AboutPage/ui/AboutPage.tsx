import React, { type FC } from 'react'
import classes from './AboutPage.module.scss'

interface AboutPageProps {
    className?: string
    children?: React.ReactNode
}

const AboutPage: FC<AboutPageProps> = props => {
    return (
        <div className={classes.aboutPage}>
            fdsfas
        </div>
    )
}

export default AboutPage
