import GlobalStyles from '@mui/joy/GlobalStyles'
import Avatar from '@mui/joy/Avatar'
import Box from '@mui/joy/Box'
import Divider from '@mui/joy/Divider'
import IconButton from '@mui/joy/IconButton'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton'
import ListItemContent from '@mui/joy/ListItemContent'
import Typography from '@mui/joy/Typography'
import Sheet from '@mui/joy/Sheet'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import DialogTitle from '@mui/joy/DialogTitle'
import DialogContent from '@mui/joy/DialogContent'
import DialogActions from '@mui/joy/DialogActions'
import Button from '@mui/joy/Button'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import ColorSchemeToggle from '../components/ColorSchemeToggle'
import { closeSidebar } from './utils'
import { Dispatch, Fragment, ReactNode, useCallback, useState } from 'react'
import useMenu, { AppMenuRouteObject } from '@/router/useMenu'
import { NavLink } from 'react-router-dom'
import { useUserStore } from '@/store/user'
import { useTranslation } from 'react-i18next'
import LanguageSelect from '@/components/LanguageSelect'

type MenuItemProps = {
  route: AppMenuRouteObject
  index?: number
}

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean
  children: ReactNode
  renderToggle: (params: {
    open: boolean
    setOpen: Dispatch<React.SetStateAction<boolean>>
  }) => ReactNode
}) {
  const [open, setOpen] = useState(defaultExpanded)
  return (
    <Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </Fragment>
  )
}

function MenuItemSingle({ route, index }: MenuItemProps) {
  const { t } = useTranslation()

  return (
    <NavLink to={route.fullPath}>
      {({ isActive }) => (
        <ListItem sx={{ mt: index === 0 ? 0.5 : 0 }}>
          <ListItemButton selected={isActive}>
            {route.meta?.icon}
            <ListItemContent>
              <Typography level="title-sm">{t(route.meta?.title || '')}</Typography>
            </ListItemContent>
          </ListItemButton>
        </ListItem>
      )}
    </NavLink>
  )
}

function MenuItemWithChildren({ route }: MenuItemProps) {
  const { t } = useTranslation()

  return (
    <ListItem nested key={route.fullPath}>
      <Toggler
        renderToggle={({ open, setOpen }) => (
          <ListItemButton onClick={() => setOpen(!open)}>
            {route.meta?.icon}
            <ListItemContent>
              <Typography level="title-sm">{t(route.meta?.title || '')}</Typography>
            </ListItemContent>
            <KeyboardArrowDownIcon sx={{ transform: open ? 'rotate(180deg)' : 'none' }} />
          </ListItemButton>
        )}
      >
        <List sx={{ gap: 0.5 }}>
          {route.children!.map((child: AppMenuRouteObject, index) => (
            <MenuItem route={child} index={index} key={child.fullPath} />
          ))}
        </List>
      </Toggler>
    </ListItem>
  )
}

function MenuItem({ route, index }: MenuItemProps) {
  return route.children?.length ? (
    <MenuItemWithChildren route={route} index={index} />
  ) : (
    <MenuItemSingle route={route} index={index} />
  )
}

export default function Sidebar() {
  const { menuRoutes } = useMenu()

  const { t } = useTranslation()

  const userInfo = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)

  const [logoutModalOpen, setLogoutModalOpen] = useState(false)

  const handleLogout = useCallback(async () => {
    await logout()
    setLogoutModalOpen(false)
  }, [logout])

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 1000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography level="title-lg">React MUI</Typography>
        <LanguageSelect sx={{ ml: 'auto' }} />
        <ColorSchemeToggle />
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '26px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          {menuRoutes.map((route) => (
            <MenuItem route={route} key={route.fullPath} />
          ))}
        </List>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar variant="outlined" size="sm" src={userInfo?.avatar} />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">{userInfo?.nickname || 'Not Logged'}</Typography>
          <Typography level="body-xs">{userInfo?.username || ''}</Typography>
        </Box>
        <IconButton
          size="sm"
          variant="plain"
          color="neutral"
          onClick={() => setLogoutModalOpen(true)}
        >
          <LogoutRoundedIcon />
        </IconButton>
      </Box>

      <Modal open={logoutModalOpen} onClose={() => setLogoutModalOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            {t('common.confirmation')}
          </DialogTitle>
          <Divider />
          <DialogContent>{t('logout.message')}</DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={handleLogout}>
              {t('common.confirm')}
            </Button>
            <Button variant="plain" color="neutral" onClick={() => setLogoutModalOpen(false)}>
              {t('common.cancel')}
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Sheet>
  )
}
