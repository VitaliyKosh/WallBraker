declare module 'react-manifest'

declare module '*.scss' {
    type IClassNames = Record<string, string>
    const classNames: IClassNames
    export = classNames
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg' {
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
    export default SVG
}

declare interface Window {
    skipWaiting?: any
    __WB_MANIFEST?: any
}

declare const __IS_DEV__: boolean
