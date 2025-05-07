import { create } from 'zustand'

interface AppState {
  showFooter: boolean
  setShowFooter: (_value: boolean) => void
}

export const useAppStore = create<AppState>()((set) => ({
  showFooter: false,
  setShowFooter: (value) => set({ showFooter: value }),
}))
