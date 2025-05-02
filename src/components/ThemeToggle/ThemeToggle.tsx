import React, { useEffect, useState } from 'react'
import {
  useThemeStore,
  THEME_DARK,
  THEME_LIGHT,
} from '@/components/ThemeToggle/themeStore'
import { FaSun, FaMoon } from 'react-icons/fa'

interface ThemeToggleProps {
  className?: string
  showThemeBadge?: boolean
  onThemeChange?: (_theme: string) => void
  size?: 'sm' | 'md' | 'lg'
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showThemeBadge = true,
  onThemeChange,
  size = 'md',
}) => {
  const { theme, setTheme, isDarkTheme } = useThemeStore()
  const [isDark, setIsDark] = useState<boolean>(isDarkTheme())

  useEffect(() => {
    setIsDark(isDarkTheme())
  }, [theme, isDarkTheme])

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = event.target.checked ? THEME_DARK : THEME_LIGHT
    setTheme(newTheme)
    onThemeChange?.(newTheme)
  }

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4'
      case 'lg':
        return 'w-8 h-8'
      default:
        return 'w-6 h-6'
    }
  }

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      data-testid="theme-toggle"
    >
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          className="theme-controller"
          checked={isDark}
          onChange={handleToggle}
        />

        {/* Sun icon from react-icons */}
        <FaSun className={`${getIconSize()} swap-off`} />

        {/* Moon icon from react-icons */}
        <FaMoon className={`${getIconSize()} swap-on`} />
      </label>

      {showThemeBadge && theme !== THEME_LIGHT && theme !== THEME_DARK && (
        <div className="badge badge-accent">{theme}</div>
      )}
    </div>
  )
}

export default ThemeToggle
