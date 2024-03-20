import Box from '@mui/joy/Box'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router'

export default function BasicLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <Sidebar />
      <Header />
      <Box
        component="main"
        className="MainContent"
        sx={{
          p: 1,
          pt: { xs: 'calc(8px + var(--Header-height))', md: 1 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100dvh',
          gap: 1,
          overflow: 'auto',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
