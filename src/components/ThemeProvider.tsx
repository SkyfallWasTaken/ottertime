import { useEffect, type ReactNode } from "react"
import { atomWithStorage } from 'jotai/utils'
import { useAtom } from "jotai"

export const themeAtom = atomWithStorage<'light' | 'dark'>('theme', 'dark')

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme] = useAtom(themeAtom)

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    return children;
}