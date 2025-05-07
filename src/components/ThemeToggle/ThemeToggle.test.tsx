import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { act } from 'react'
import ThemeToggle from './ThemeToggle'
import { useThemeStore, THEME_DARK, THEME_LIGHT } from './themeStore'

// Reset theme store before each test
beforeEach(() => {
  const { setTheme } = useThemeStore.getState()
  act(() => {
    setTheme(THEME_LIGHT)
  })

  // Clean up the DOM
  document.documentElement.removeAttribute('data-theme')
})

describe('ThemeToggle', () => {
  it('should render the component', () => {
    render(<ThemeToggle />)
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })

  it('should reflect the current theme from the store', () => {
    const { setTheme } = useThemeStore.getState()
    act(() => {
      setTheme(THEME_DARK)
    })

    render(<ThemeToggle />)
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.checked).toBe(true)

    // Light theme
    act(() => {
      setTheme(THEME_LIGHT)
    })
    expect(checkbox.checked).toBe(false)
  })

  it('should toggle theme when checkbox is clicked', () => {
    render(<ThemeToggle />)
    const checkbox = screen.getByRole('checkbox')

    // Initial state (light theme)
    expect(useThemeStore.getState().theme).toBe(THEME_LIGHT)

    // Toggle to dark theme
    fireEvent.click(checkbox)
    expect(useThemeStore.getState().theme).toBe(THEME_DARK)

    // Toggle back to light theme
    fireEvent.click(checkbox)
    expect(useThemeStore.getState().theme).toBe(THEME_LIGHT)
  })

  it('should update the document theme attribute', () => {
    render(<ThemeToggle />)
    const checkbox = screen.getByRole('checkbox')

    // Toggle to dark theme
    fireEvent.click(checkbox)
    expect(document.documentElement.getAttribute('data-theme')).toBe(THEME_DARK)

    // Toggle back to light theme
    fireEvent.click(checkbox)
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      THEME_LIGHT,
    )
  })

  it('should show a badge for non-standard themes', () => {
    const { setTheme } = useThemeStore.getState()

    // Set a custom theme
    act(() => {
      setTheme('retro')
    })

    render(<ThemeToggle />)
    expect(screen.getByText('retro')).toBeInTheDocument()

    // Standard theme shouldn't show badge
    act(() => {
      setTheme(THEME_LIGHT)
    })
    expect(screen.queryByText('reactcraft-light')).not.toBeInTheDocument()
  })

  it('should synchronize with theme changes', () => {
    const { setTheme } = useThemeStore.getState()

    render(<ThemeToggle />)
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement

    // Initially light theme
    expect(checkbox.checked).toBe(false)

    // Change theme via store
    act(() => {
      setTheme(THEME_DARK)
    })

    expect(checkbox.checked).toBe(true)
  })
})
