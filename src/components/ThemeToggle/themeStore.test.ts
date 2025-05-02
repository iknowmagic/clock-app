import { describe, it, expect, beforeEach } from 'vitest'
import { act } from 'react'
import {
  useThemeStore,
  THEME_DARK,
  THEME_LIGHT,
  AVAILABLE_THEMES,
} from './themeStore'

describe('Theme Store', () => {
  beforeEach(() => {
    // Reset to default theme
    const { setTheme } = useThemeStore.getState()
    act(() => {
      setTheme(THEME_LIGHT)
    })
  })

  it('should initialize with the default theme', () => {
    const { theme } = useThemeStore.getState()
    expect(theme).toBe(THEME_LIGHT)
  })

  it('should change the theme', () => {
    const { setTheme } = useThemeStore.getState()

    act(() => {
      setTheme(THEME_DARK)
    })

    const { theme } = useThemeStore.getState()
    expect(theme).toBe(THEME_DARK)
  })

  it('should detect dark theme correctly', () => {
    const { setTheme, isDarkTheme } = useThemeStore.getState()

    // Light theme
    expect(isDarkTheme()).toBe(false)

    // Dark theme
    act(() => {
      setTheme(THEME_DARK)
    })
    expect(isDarkTheme()).toBe(true)

    // Another theme
    act(() => {
      setTheme('retro')
    })
    expect(isDarkTheme()).toBe(false)
  })

  it('should detect light theme correctly', () => {
    const { setTheme, isLightTheme } = useThemeStore.getState()

    // Light theme
    expect(isLightTheme()).toBe(true)

    // Dark theme
    act(() => {
      setTheme(THEME_DARK)
    })
    expect(isLightTheme()).toBe(false)

    // Another theme
    act(() => {
      setTheme('retro')
    })
    expect(isLightTheme()).toBe(false)
  })

  it('should update document theme attribute', () => {
    const { setTheme } = useThemeStore.getState()

    act(() => {
      setTheme('cupcake')
    })

    expect(document.documentElement.getAttribute('data-theme')).toBe('cupcake')
  })

  it('should only accept valid themes', () => {
    const { setTheme } = useThemeStore.getState()

    // Check that all available themes work
    AVAILABLE_THEMES.forEach((theme) => {
      act(() => {
        setTheme(theme)
      })
      expect(useThemeStore.getState().theme).toBe(theme)
    })
  })
})
