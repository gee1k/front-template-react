import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import i18n from '@/i18n'

export interface AppState {
  language: string
  setLanguage: (language: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: i18n.language,
      setLanguage: (language) => {
        i18n.changeLanguage(language)
        set({ language })
      },
    }),
    {
      name: 'app-storage',
    },
  ),
)
