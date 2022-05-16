import { atom } from 'recoil'
import i18n from '@/i18n'

export const languageState = atom({
  key: 'languageState',
  default: i18n.language || 'zh',
})
