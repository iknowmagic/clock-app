import { Theme } from './themeStore'

export interface ThemeToggleProps {
  /**
   * Additional CSS class names
   */
  className?: string

  /**
   * Show theme name badge for non-standard themes
   * @default true
   */
  showThemeBadge?: boolean

  /**
   * Optional callback when theme changes
   */
  onThemeChange?: (_theme: Theme) => void

  /**
   * Size of the toggle icons
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg'
}

export interface ThemeIconProps {
  size?: string
  className?: string
}
