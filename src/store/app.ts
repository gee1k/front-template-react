import { atom } from 'recoil'
import settings from '@/settings'
import i18n from '@/i18n'

export const settingsState = atom({
  key: 'settingsState',
  default: {
    collapsed: settings.collapsed,
  },
})

export const languageState = atom({
  key: 'languageState',
  default: i18n.language || 'zh',
})
