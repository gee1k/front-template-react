import IconButton, { IconButtonProps } from '@mui/joy/IconButton'
import Dropdown from '@mui/joy/Dropdown'
import Menu from '@mui/joy/Menu'
import MenuItem from '@mui/joy/MenuItem'
import MenuButton from '@mui/joy/MenuButton'
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded'
import { supportedLanguages } from '@/i18n'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

export default function LanguageSelect(props: IconButtonProps) {
  const { i18n, t } = useTranslation()

  const currentLanguage = useMemo(() => i18n.language, [i18n.language])

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'outlined', color: 'neutral', size: 'sm', ...props } }}
      >
        <TranslateRoundedIcon />
      </MenuButton>
      <Menu sx={{ zIndex: 1001 }} size="sm">
        {supportedLanguages.map((lang) => (
          <MenuItem
            key={lang}
            selected={currentLanguage === lang}
            onClick={() => handleChangeLanguage(lang)}
          >
            <TranslateRoundedIcon />
            {t('language.' + lang)}
          </MenuItem>
        ))}
      </Menu>
    </Dropdown>
  )
}
