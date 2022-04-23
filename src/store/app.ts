import { atom } from 'recoil'
import i18n from '@/i18n'

export const settingsState = atom({
  key: 'settingsState',
  default: {
    title: '管理系统',
    collapsed: false,
    flatMenu: true,
    breadcrumb: true,
    footer: false,
    copyright: 'Front Template ©2022 Created by Svend',
  },
})

export const languageState = atom({
  key: 'languageState',
  default: i18n.language || 'zh',
})
