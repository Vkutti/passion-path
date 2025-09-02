import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import AuthWrapper from './components/AuthWrapper'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AuthWrapper />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
