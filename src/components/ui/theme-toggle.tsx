import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from './button'
import { useAtom } from 'jotai'
import { themeAtom } from '../theme-provider'

export function ThemeToggle() {
  const [theme, setTheme] = useAtom(themeAtom)

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  )
}
