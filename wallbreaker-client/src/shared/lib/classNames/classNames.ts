type Mods = Record<string, boolean | string>

export function classNames(str: string, mods: Mods = {}, additional: string[] = []): string {
    return [
        str,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([className, value]) => Boolean(value))
            .map(([className]) => className)
    ].join(' ')
}
