export default function () {
    const iosQuirkPresent = function () {
        const audio = new Audio()

        audio.volume = 0.5
        return audio.volume === 1
    }

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isAppleDevice = navigator.userAgent.includes('Macintosh')
    const isTouchScreen = navigator.maxTouchPoints >= 1

    return isIOS || (isAppleDevice && (isTouchScreen || iosQuirkPresent()))
}
