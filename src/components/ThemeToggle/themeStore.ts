import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Theme constants
export const THEME_LIGHT = 'reactcraft-light'
export const THEME_DARK = 'reactcraft-dark'
export const THEME_SYSTEM = 'system'

export const AVAILABLE_THEMES = [
  'light',
  'dark',
  'retro',
  'cupcake',
  THEME_LIGHT,
  THEME_DARK,
] as const

export type Theme = (typeof AVAILABLE_THEMES)[number] | typeof THEME_SYSTEM

interface ThemeStore {
  theme: Theme
  setTheme: (_theme: Theme) => void
  isDarkTheme: () => boolean
  isLightTheme: () => boolean
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: THEME_LIGHT, // default
      setTheme: (theme) => {
        set({ theme })

        if (theme === THEME_SYSTEM) {
          const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)',
          ).matches
          const resolved = prefersDark ? THEME_DARK : THEME_LIGHT
          document.documentElement.setAttribute('data-theme', resolved)
        } else {
          document.documentElement.setAttribute('data-theme', theme)
        }
      },
      isDarkTheme: () => {
        if (get().theme === THEME_SYSTEM) {
          return window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        return get().theme === THEME_DARK
      },
      isLightTheme: () => {
        if (get().theme === THEME_SYSTEM) {
          return window.matchMedia('(prefers-color-scheme: light)').matches
        }
        return get().theme === THEME_LIGHT
      },
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (state.theme === THEME_SYSTEM) {
            const prefersDark = window.matchMedia(
              '(prefers-color-scheme: dark)',
            ).matches
            const resolved = prefersDark ? THEME_DARK : THEME_LIGHT
            document.documentElement.setAttribute('data-theme', resolved)
          } else {
            document.documentElement.setAttribute('data-theme', state.theme)
          }
        }
      },
    },
  ),
)
