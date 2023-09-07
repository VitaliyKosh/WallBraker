import { Location } from '@remix-run/router/dist/history'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { privateRoutePath } from 'shared/config/routeConfig/routeConfig'
import { useTypedSelector } from 'shared/store/hooks/useTypedSelector'

export function useTransitions() {
    const location = useLocation()
    const navigate = useNavigate()
    const { auth } = useTypedSelector(state => state.user)

    const [isAnimation, setIsAnimation] = useState(false)

    const [firstLocation, setFirstLocation] = useState(null as Location)
    const [nextLocation, setNextLocation] = useState(null as Location)

    const [stopAnimation, setStopAnimation] = useState(false)

    const [displayLocation, setDisplayLocation] = useState(location)
    const [transitionStage, setTransitionStage] = useState('wait')

    const [oldLocation, setOldLocation] = useState(null)
    const [oldLocationStage, setOldLocationStage] = useState('hide')

    const lastLocation = useRef('/app/main')

    useEffect(() => {
        if (!isAnimation && nextLocation && firstLocation) {
            if (location.pathname !== displayLocation.pathname) {
                setTimeout(() => {
                    startAnimation(nextLocation, firstLocation)
                }, 10)
            }
        }
    }, [isAnimation])

    useEffect(() => {
        if (auth) {
            console.log(auth)
            setOldLocation(null)
        }
    }, [auth])

    useEffect(() => {
        if (!isAnimation && nextLocation && firstLocation) {
            startAnimation(nextLocation, firstLocation)
        }
    }, [nextLocation])

    useEffect(() => {
        if (location.pathname !== displayLocation.pathname) {
            setNextLocation(location)
            setFirstLocation(displayLocation)
        }
    }, [location.pathname])

    useEffect(() => {
        if (stopAnimation) {
            startTransition(TransitionType.CLEAR, location, displayLocation)
            setIsAnimation(true)
            setStopAnimation(false)
        }
    }, [stopAnimation])

    useEffect(() => {
        const popstateHandler = (e: PopStateEvent) => {
            setStopAnimation(true)
            // const currentLocation = (e.currentTarget as Window).location.pathname
            // console.log(currentLocation.split('/').length, lastLocation.current.split('/').length)
            // if (currentLocation.split('/').length > lastLocation.current.split('/').length) {
            //     navigate(currentLocation.split('/').slice(0, -2).join('/'))
            // } else if (
            //     currentLocation.split('/').length ===
            //     lastLocation.current.split('/').length
            // ) {
            //     navigate(currentLocation.split('/').slice(0, -1).join('/'))
            // }

            // // else if (currentLocation.split('/').length < 3) {
            // //     navigate(privateRoutePath.MAIN)
            // // }
            // lastLocation.current = currentLocation
        }

        window.addEventListener('popstate', popstateHandler)

        return function () {
            window.removeEventListener('popstate', popstateHandler)
        }
    }, [])

    enum TransitionType {
        TO_LEFT = 'TO_LEFT',
        TO_RIGHT = 'TO_RIGHT',
        SLIDE_IN = 'SLIDE_IN',
        SLIDE_OUT = 'SLIDE_OUT',
        CLEAR = 'CLEAR'
    }

    const tabsPosition = [
        privateRoutePath.INSTRUCTION.split('/')[2],
        privateRoutePath.SHOP.split('/')[2],
        privateRoutePath.MAIN.split('/')[2],
        privateRoutePath.CHAT.split('/')[2],
        privateRoutePath.SETTINGS.split('/')[2]
    ]

    const choseTransition = (location: Location, displayLocation: Location) => {
        const newPathname = location.pathname
        const oldPathname = displayLocation.pathname

        const newPathnameSplit = newPathname.split('/')
        const oldPathnameSplit = oldPathname.split('/')

        if (oldPathnameSplit[2] === '') {
            return TransitionType.CLEAR
        }

        if (
            newPathnameSplit.length < 4 &&
            oldPathnameSplit[2] !== newPathnameSplit[2]
        ) {
            if (
                tabsPosition.indexOf(newPathnameSplit[2]) >
                tabsPosition.indexOf(oldPathnameSplit[2])
            ) {
                return TransitionType.TO_LEFT
            } else {
                return TransitionType.TO_RIGHT
            }
        } else {
            const newPathnameLength = newPathnameSplit.length
            const oldPathnameLength = oldPathnameSplit.length
            if (newPathnameLength > oldPathnameLength) {
                return TransitionType.SLIDE_IN
            } else {
                return TransitionType.SLIDE_OUT
            }
        }
    }

    const startAnimation = (location: Location, displayLocation: Location) => {
        const transition = choseTransition(location, displayLocation)
        startTransition(transition, location, displayLocation)
        setIsAnimation(true)
    }

    const startTransition = (
        type: TransitionType,
        location: Location,
        displayLocation: Location
    ) => {
        setTransitionStage(`fadeIn-${type}`)
        setOldLocationStage(`fadeOut-${type}`)
        setOldLocation(displayLocation)
        setDisplayLocation(location)
        if (displayLocation.pathname.split('/')[2] === '') {
            setFirstLocation(null)
            setNextLocation(null)
        }
    }

    const onAnimationEnd = () => {
        if (transitionStage.split('-')[0] === 'fadeIn') {
            setTransitionStage('wait')
            setOldLocationStage('hide')
            setIsAnimation(false)
            setOldLocation(null)
        }
    }

    return {
        displayLocation,
        transitionStage,
        oldLocation,
        oldLocationStage,
        onAnimationEnd
    }
}
