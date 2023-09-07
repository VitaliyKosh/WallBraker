import React, { FC } from 'react'
import classes from './Links.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTelegram } from '@fortawesome/free-brands-svg-icons'

interface LinksProps {
    className?: string
}

const Links: FC<LinksProps> = props => {
    return (
        <div className={[props.className, classes.links].join(' ')}>
            <a href='https://t.me/WallBreakerVPN'>
                <FontAwesomeIcon className={classes.link} icon={faTelegram}/>
            </a>
            {/* <FontAwesomeIcon icon={faWire}/> */}
        </div>
    )
}

export default Links
