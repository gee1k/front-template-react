import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { CssVarsProvider } from '@mui/joy/styles'
import CssBaseline from '@mui/joy/CssBaseline'

import './App.css'

function App() {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </CssVarsProvider>
  )
}

export default App
